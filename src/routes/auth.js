import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import validationMiddleware from "../middlewares/validationMiddleware.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();



/* 🔥 REGISTER */
router.post(
  "/register",
  validationMiddleware,
  registerUser
);



/* 🔥 LOGIN */
router.post(
  "/login",
  validationMiddleware,
  loginUser
);



/* 🔥 CURRENT LOGGED IN USER */
router.get(
  "/me",
  authMiddleware,
  async (req, res) => {

    try {

      res.status(200).json({
        success: true,
        user: req.user,
      });

    } catch (err) {

      console.log(
        "GET USER ERROR:",
        err.message
      );

      res.status(500).json({
        success: false,
        msg: "Server Error ❌",
      });
    }
  }
);



export default router;