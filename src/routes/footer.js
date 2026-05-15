import express from "express";

import {
  getFooter,
  createFooter,
  updateFooter,
  deleteFooter,
} from "../controllers/footerController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();



/* 🔥 GET FOOTER */
router.get(
  "/",
  getFooter
);



/* 🔥 CREATE FOOTER (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createFooter
);



/* 🔥 UPDATE FOOTER (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateFooter
);



/* 🔥 DELETE FOOTER (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteFooter
);



export default router;