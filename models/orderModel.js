import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  cartItems: [
    {
      _id: false,
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
      qty: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending", "Failed"],
    default: "Pending",
  },
  stripePaymentIntentId: { type: String },
});

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
