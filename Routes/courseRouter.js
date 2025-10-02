import express from "express";
import { upload } from "../middleware/multer.js";
import { validateParams } from "../middleware/validation.js";
import {
  addNewCourse,
  getAllCourse,
  getCourseById,
} from "../controllers/courseController.js";

const courseRouter = express.Router();
courseRouter.get("/", getAllCourse);
courseRouter.get("/:courseId", validateParams(["courseId"]), getCourseById);
courseRouter.post("/add", upload.single("img"), addNewCourse);

export default courseRouter;
