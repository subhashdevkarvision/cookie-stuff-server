import express from "express";
import cors from "cors";
import { connectDb } from "./configs/mongoose.js";
import courseRouter from "./Routes/courseRouter.js";
import "dotenv/config";
import userRouter from "./Routes/userRouter.js";
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
connectDb();

app.use("/courses", courseRouter);
app.use("/api", userRouter);
app.use("/", (req, res) => {
  res.send("api is running ");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
