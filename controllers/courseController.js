import { cartModel } from "../models/cartModel.js";
import { courserModel } from "../models/coursesModel.js";

export const addNewCourse = async (req, res) => {
  const course = req.body;
  const file = req.file;
  console.log(file);
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
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
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
// add to cart
export const addTocart = async (req, res) => {
  //   const product = req.body;
  const { courseId } = req.body;
  if (!courseId) {
    return res
      .status(404)
      .json({ success: false, message: "Product data not found" });
  }
  try {
    const course = await courserModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "course not found" });
    }
    const exstingProduct = await cartModel.findOne({ courseId });
    if (exstingProduct) {
      exstingProduct.qty += 1;
      await exstingProduct.save();
      return res
        .status(201)
        .json({ success: true, message: "product qty increased" });
    }
    const newProduct = new cartModel({ courseId, qty: 1 });
    await newProduct.save();
    return res
      .status(201)
      .json({ success: true, message: "product added to cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) {
    return res
      .status(400)
      .json({ success: false, message: "Product id is required" });
  }
  try {
    const product = await cartModel.findOneAndDelete({ courseId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product is not available in cart" });
    }
    return res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// increment quantity

export const increseQuantity = async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) {
    return res
      .status(404)
      .json({ success: false, message: "id is required to increament" });
  }
  try {
    const product = await cartModel.findOne({ courseId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found in the cart" });
    }
    product.qty += 1;
    await product.save();
    return res
      .status(200)
      .json({ success: true, message: "increamented the quantity" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// decrement quantity
export const decrementQuantity = async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) {
    return res
      .status(404)
      .json({ success: false, message: "id is required for decreament" });
  }
  try {
    const product = await cartModel.findOne({ courseId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found for decreament" });
    }
    if (product.qty > 1) {
      product.qty -= 1;
      await product.save();
      return res
        .status(200)
        .json({ success: true, message: "decreamented the quantity" });
    } else {
      await cartModel.findOneAndDelete({ courseId });
      return res
        .status(200)
        .json({ success: true, message: "item removed from cart" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get all cartItems
export const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await cartModel
      .find()
      .populate("courseId", "title imgUrl discountedPrice");
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ success: false, message: "Cart is empty" });
    }
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cartData: cartItems,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
