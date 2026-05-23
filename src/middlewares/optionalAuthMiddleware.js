import jwt from "jsonwebtoken";
import User from "../models/User.js";

/** Attach req.user when a valid Bearer token is present; otherwise continue as guest. */
const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      req.user = user;
    }
  } catch {
    // Invalid or expired token — treat as guest for lead creation
  }
  next();
};

export default optionalAuthMiddleware;
