import jwt from "jsonwebtoken";
import { User } from "../models/users.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Login First" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const isStaff = async (req, res, next) => {
  try {
    if (req.user && req.user.isStaff) {
      return next(); // User is staff, proceed
    } else {
      return res.status(403).json({ success: false, message: "Access denied. Staff privileges required." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      return next(); // User is admin, proceed
    } else {
      return res.status(403).json({ success: false, message: "Access denied. Admin privileges required." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};