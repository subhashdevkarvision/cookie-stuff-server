import express from "express";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import { cartModel } from "../models/cartModel.js";
const webhookRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

webhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    // console.log("Cart cleared for user:", userId);
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      return res.status(400).send(error.message);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const cartData = JSON.parse(session.metadata.cart);

      const order = new orderModel({
        userId,
        cartItems: cartData,
        totalAmount: session.amount_total / 100,
        paymentStatus: "Paid",
        stripeSessionId: session.id,
      });

      await order.save();
      await cartModel.deleteMany({ userId });
    }
    res.json({ success: true, message: "Order done", received: true });
  }
);

export default webhookRouter;
