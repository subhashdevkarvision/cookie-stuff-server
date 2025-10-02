import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cartModel } from "../models/cartModel.js";

// register user
export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const exstingUser = await userModel.findOne({ email });
    if (exstingUser) {
      return res
        .status(409)
        .json({ success: false, message: "user is already available" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashPassword,
    });
    return res
      .status(200)
      .json({ success: true, message: "Registed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      authenticateKey: token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get user data
export const getUserData = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res
      .status(404)
      .json({ success: false, message: "token id not found" });
  }
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      userData: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get user cart
export const getUserCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const userCart = await cartModel
      .find({ userId })
      .populate("courseId", "title imgUrl discountedPrice");
    return res.status(200).json({
      success: true,
      message: "cart fetched successfully",
      cartData: userCart.length > 0 ? userCart : [],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
