import express from "express";
import cors from "cors";
import { connectDb } from "./configs/mongoose.js";
import courseRouter from "./Routes/courseRouter.js";
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
connectDb();

app.use("/courses", courseRouter);
app.use("/", (req, res) => {
  res.send("api is running ");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
