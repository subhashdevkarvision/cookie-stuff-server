import mongoose from "mongoose";

export const connectDb = async () => {
  mongoose.connection.on("connected", () => console.log("database connected"));
  await mongoose.connect("mongodb://localhost:27017/cookie-stuff-template");
};
