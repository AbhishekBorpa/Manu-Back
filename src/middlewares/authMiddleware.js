import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (
  req,
  res,
  next
) => {
  try {

    /* 🔥 TOKEN GET */
    const authHeader =
      req.headers.authorization;

    /* 🔥 CHECK TOKEN */
    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return res.status(401).json({
        success: false,
        msg:
          "No token provided ❌",
      });
    }

    /* 🔥 EXTRACT TOKEN */
    const token =
      authHeader.split(" ")[1];

    /* 🔥 VERIFY TOKEN */
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    /* 🔥 FIND USER */
    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    /* 🔥 USER CHECK */
    if (!user) {
      return res.status(401).json({
        success: false,
        msg:
          "User not found ❌",
      });
    }

    /* 🔥 SAVE USER */
    req.user = user;

    next();

  } catch (err) {

    console.log(
      "AUTH ERROR:",
      err.message
    );

    /* 🔥 TOKEN EXPIRED */
    if (
      err.name ===
      "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        msg:
          "Token expired ❌",
      });
    }

    /* 🔥 INVALID TOKEN */
    if (
      err.name ===
      "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        msg:
          "Invalid token ❌",
      });
    }

    res.status(500).json({
      success: false,
      msg:
        "Authentication failed ❌",
    });
  }
};

export default authMiddleware;