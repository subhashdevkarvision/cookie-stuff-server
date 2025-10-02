import { courserModel } from "../models/courseModel.js";

export const addNewCourse = async (req, res) => {
  const course = req.body;
  const file = req.file;
  if (file) {
    req.body.imgUrl = `uploads/${file.filename}`;
  }
  if (!course) {
    return res
      .status(404)
      .json({ success: false, message: "New product no found" });
  }
  try {
    if (Array.isArray(course)) {
      const newCourses = await courserModel.insertMany(course);
      return res.status(201).json({ success: true, message: "Courses added" });
    }
    const newCourse = new courserModel(course);
    await newCourse.save();
    return res.status(201).json({ success: true, message: "new course added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//  get courses
export const getAllCourse = async (req, res) => {
  try {
    const courses = await courserModel.find();
    if (!courses) {
      return res
        .status(404)
        .json({ success: false, message: "courses not available" });
    }
    return res.status(200).json({
      success: true,
      message: "courses fetched successfully",
      coursesData: courses,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get course by id
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await courserModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course is not available" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Course fethced successfully", course });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
