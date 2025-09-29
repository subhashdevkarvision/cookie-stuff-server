import mongoose from "mongoose";

export const connectDb = async () => {
  mongoose.connection.on("connected", () => console.log("database connected"));
  await mongoose.connect(
    "mongodb+srv://subhashdevkarvision:vision12@cluster0.ofqr7yr.mongodb.net/cookie-stuff-template"
  );
};
