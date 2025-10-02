import { cartModel } from "../models/cartModel.js";
import { courserModel } from "../models/courseModel.js";
import { userModel } from "../models/userModel.js";

// add to cart
export const addTocart = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  try {
    const course = await courserModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "course not found" });
    }
    const newProduct = new cartModel({ courseId, qty: 1, userId });
    await newProduct.save();
    return res
      .status(201)
      .json({ success: true, message: "product added to cart" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;
  try {
    const product = await cartModel.findOneAndDelete({ courseId, userId });
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
  const userId = req.user.id;
  try {
    const product = await cartModel.findOne({ courseId: courseId, userId });
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
  const userId = req.user.id;
  try {
    const product = await cartModel.findOne({ courseId, userId });
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
    if (!cartItems) {
      return res.status(404).json({ success: false, message: "Cart is empty" });
    }
    if (cartItems.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "Cart is empty", cartData: [] });
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
