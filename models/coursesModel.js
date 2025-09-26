import mongoose from "mongoose";

const courserSchema = mongoose.Schema({
  //   id: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  title: { type: String, required: true },
  access: { type: String },
  ratings: { type: String, required: true },
  startCount: { type: String, required: true },
  ratingCounts: { type: String, required: true },
  price: { type: String, required: true },
  discountedPrice: { type: String, required: true },
  courseType: { type: String },
  qty: { type: Number, required: true },
  Instructor: { type: String, required: true },
  Duration: { type: String, required: true },
  Lectures: { type: Number, required: true },
  Level: { type: String, required: true },
  Language: { type: String, required: true },
  Certificate: { type: String, required: true },
  Enrolled: { type: Number, required: true },
  category: { type: String, required: true },
});

export const courserModel = mongoose.model("course", courserSchema);
