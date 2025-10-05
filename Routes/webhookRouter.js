import express from "express";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import { cartModel } from "../models/cartModel.js";
const webhookRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

webhookRouter.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const { data } = req.body;
  if (data.object.status === "succeeded") {
    const session = data.object;
    const order = await orderModel.findById(session.metadata.id);
    order.paymentStatus = "Paid";
    order.stripePaymentIntentId = session.id;
    await order.save();
    await cartModel.deleteMany({ userId: order.userId });
  }
  res.json({ success: true, message: "Order done", received: true });
});

export default webhookRouter;
