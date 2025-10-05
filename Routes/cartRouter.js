import express from "express";
import {
  addTocart,
  decrementQuantity,
  getAllCartItems,
  increseQuantity,
  removeFromCart,
} from "../controllers/cartController.js";
import { validateFields, validateParams } from "../middleware/validation.js";
import userAuth from "../middleware/userAuth.js";

const cartRouter = express.Router();
cartRouter.post(
  "/add-to-cart",
  validateFields(["courseId"]),
  userAuth,
  addTocart
);
cartRouter.delete(
  "/remove/:courseId",
  validateParams(["courseId"]),
  userAuth,
  removeFromCart
);
cartRouter.patch(
  "/increament/:courseId",
  validateParams(["courseId"]),
  userAuth,
  increseQuantity
);
cartRouter.patch(
  "/decreament/:courseId",
  validateParams(["courseId"]),
  userAuth,
  decrementQuantity
);

export default cartRouter;
