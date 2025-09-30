import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  qty: { type: Number, required: true },
});

export const cartModel = mongoose.model("cart", cartSchema);
