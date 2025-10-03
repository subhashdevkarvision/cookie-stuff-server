import express from "express";
import { validateFields } from "../middleware/validation.js";
import { checkoutSession } from "../controllers/paymentController.js";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userAuth from "../middleware/userAuth.js";

const paymentRouter = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
paymentRouter.post(
  "/",
  userAuth,
  validateFields(["cartItems"]),
  checkoutSession
);
// paymentRouter.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let event;
//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (error) {
//       return res.status(400).send(error.message);
//     }

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       const userId = session.metadata.userId;
//       const cartData = JSON.parse(session.metadata.cart);

//       const order = new orderModel({
//         userId,
//         cartItems: cartData,
//         totalAmount: session.amount_total / 100,
//         paymentStatus: "Paid",
//         stripeSessionId: session.id,
//       });

//       await order.save();
//       await CartModel.deleteMany({ userId });
//       console.log("Cart cleared for user:", userId);
//     }
//     res.json({ success: true, message: "Order done", received: true });
//   }
// );

export default paymentRouter;
