import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select(
        "-password -verified -token -__v"
      );
      next();
    } catch {
      return res.status(403).json({ message: "No autorizado, token inválido" });
    }
  } else {
    return res.status(403).json({ message: "No autorizado, token faltante" });
  }
};

export default authMiddleware;
