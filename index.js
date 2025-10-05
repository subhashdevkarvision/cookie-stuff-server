import express from "express";
import cors from "cors";
import { connectDb } from "./configs/mongoose.js";
import courseRouter from "./routes/courseRouter.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRouter.js";
import cartRouter from "./routes/cartRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import webhookRouter from "./routes/webhookRouter.js";
import paymentIntentRouter from "./Routes/paymentIntendRouter.js";
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
connectDb();

app.use("/checkout/webhook", webhookRouter);
app.use("/courses", courseRouter);
app.use("/cart", cartRouter);
app.use("/api", userRouter);
app.use("/checkout", paymentIntentRouter);
// app.use("/checkout", paymentRouter);
app.use("/", (req, res) => {
  res.send("api is running ");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
