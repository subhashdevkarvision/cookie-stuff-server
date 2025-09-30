import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "All Fields Required" });
  }
  try {
    const exstingUser = await userModel.findOne({ email });
    if (exstingUser) {
      return res
        .status(409)
        .json({ success: false, message: "user is already available" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
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
  if (!email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "All fields required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      sameSite: process.env.NODE_ENV === "Production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ success: true, message: "Login Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
