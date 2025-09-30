import mongoose from "mongoose";

export const connectDb = async () => {
  mongoose.connection.on("connected", () => console.log("database connected"));
  await mongoose.connect(`${process.env.MONGODB_URL}/cookie-stuff-template`);
};
