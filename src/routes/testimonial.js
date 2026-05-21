import express from "express";

import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();



/* 🔥 GET ALL TESTIMONIALS */
router.get(
  "/",
  getTestimonials
);



/* 🔥 CREATE TESTIMONIAL (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  createTestimonial
);



/* 🔥 UPDATE TESTIMONIAL (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  updateTestimonial
);



/* 🔥 DELETE TESTIMONIAL (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteTestimonial
);



export default router;