import express from "express";

import {
  getIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from "../controllers/industryController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();



/* 🔥 GET ALL INDUSTRIES */
router.get(
  "/",
  getIndustries
);



/* 🔥 CREATE INDUSTRY (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  createIndustry
);



/* 🔥 UPDATE INDUSTRY (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateIndustry
);



/* 🔥 DELETE INDUSTRY (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteIndustry
);



export default router;