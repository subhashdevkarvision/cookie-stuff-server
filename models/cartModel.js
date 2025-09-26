import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  //   id: { type: Number, required: true },
  //   imgUrl: { type: String, required: true },
  //   title: { type: String, required: true },
  //   discountedPrice: { type: String, required: true },
  qty: { type: Number, required: true },
});

export const cartModel = mongoose.model("cart", cartSchema);
