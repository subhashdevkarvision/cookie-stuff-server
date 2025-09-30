import express from "express";
import {
  addNewCourse,
  addTocart,
  decrementQuantity,
  getAllCartItems,
  getAllCourse,
  getCourseById,
  increseQuantity,
  removeFromCart,
} from "../controllers/courseController.js";
import { upload } from "../middleware/multer.js";
const courseRouter = express.Router();
// courses router
courseRouter.post("/add", upload.single("img"), addNewCourse);
courseRouter.get("/course", getAllCourse);
courseRouter.get("/course/:courseId", getCourseById);

// cart router
courseRouter.get("/cart", getAllCartItems);
courseRouter.post("/add-to-cart", addTocart);
courseRouter.delete("/remove/:courseId", removeFromCart);
courseRouter.patch("/increament/:courseId", increseQuantity);
courseRouter.patch("/decreament/:courseId", decrementQuantity);

export default courseRouter;
