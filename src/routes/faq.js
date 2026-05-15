import express from "express";

import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/faqController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();



/* 🔥 GET ALL FAQS */
router.get(
  "/",
  getFaqs
);



/* 🔥 CREATE FAQ (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createFaq
);



/* 🔥 UPDATE FAQ (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateFaq
);



/* 🔥 DELETE FAQ (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteFaq
);



export default router;