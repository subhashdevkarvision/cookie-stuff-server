import express from "express";
import {
  getUserCart,
  getUserData,
  login,
  registerUser,
} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";
import { validateFields } from "../middleware/validation.js";
const userRouter = express.Router();

userRouter.post(
  "/register",
  validateFields(["fullName", "email", "password"]),
  registerUser
);
userRouter.post("/login", validateFields(["email", "password"]), login);
userRouter.get("/is-auth", userAuth, getUserData);
userRouter.get("/cart", userAuth, getUserCart);

export default userRouter;
