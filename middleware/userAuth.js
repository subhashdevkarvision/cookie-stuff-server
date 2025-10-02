import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
  const tokenData = req.headers.authorization;
  const token = tokenData?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorised" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_KEY);
    req.user = tokenDecode;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default userAuth;
