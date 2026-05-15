import express from "express";

import {
  getCities,
  createCity,
  updateCity,
  deleteCity,
} from "../controllers/cityController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();



/* 🔥 GET ALL CITIES */
router.get(
  "/",
  getCities
);



/* 🔥 CREATE CITY (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createCity
);



/* 🔥 UPDATE CITY (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateCity
);



/* 🔥 DELETE CITY (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCity
);



export default router;