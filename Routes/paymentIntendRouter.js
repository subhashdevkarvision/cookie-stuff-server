import express, { json } from "express";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
const paymentIntentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
paymentIntentRouter.post("/create-payment", async (req, res) => {
  try {
    const { amount, cartItems } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount provided",
      });
    }
    const cart = cartItems.map((item) => ({
      courseId: item.courseId._id,
      qty: item.qty,
    }));
    const order = new orderModel({
      userId: cartItems[0].userId,
      cartItems: cart,
      totalAmount: amount,
      paymentStatus: "Pending",
    });
    await order.save();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { id: order._id.toString() },
    });
    res.status(201).json({
      success: true,
      message: "payment intent created successfully",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default paymentIntentRouter;
