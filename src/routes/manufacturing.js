import express from "express";

import {
  getManufacturing,
  createManufacturing,
  updateManufacturing,
  deleteManufacturing,
} from "../controllers/manufacturingController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();



/* 🔥 GET ALL MANUFACTURING */
router.get(
  "/",
  getManufacturing
);



/* 🔥 CREATE MANUFACTURING (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  createManufacturing
);



/* 🔥 UPDATE MANUFACTURING (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  updateManufacturing
);



/* 🔥 DELETE MANUFACTURING (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteManufacturing
);



export default router;