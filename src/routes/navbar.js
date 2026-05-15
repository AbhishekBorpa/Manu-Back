import express from "express";

import {
  getNavbar,
  createNavbar,
  updateNavbar,
  deleteNavbar,
} from "../controllers/navbarController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();



/* 🔥 GET NAVBAR */
router.get(
  "/",
  getNavbar
);



/* 🔥 CREATE NAVBAR (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createNavbar
);



/* 🔥 UPDATE NAVBAR (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateNavbar
);



/* 🔥 DELETE NAVBAR (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteNavbar
);



export default router;