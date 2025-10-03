import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  cartItems: [
    {
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
  stripeSessionId: { type: String, required: true },
});

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
