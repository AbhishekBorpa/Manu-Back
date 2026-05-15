import express from "express";

import {
  getLocationCities,
  createLocationCity,
  updateLocationCity,
  deleteLocationCity,
} from "../controllers/locationCityController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();



/* 🔥 GET ALL LOCATION CITIES */
router.get(
  "/",
  getLocationCities
);



/* 🔥 CREATE LOCATION CITY (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createLocationCity
);



/* 🔥 UPDATE LOCATION CITY (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateLocationCity
);



/* 🔥 DELETE LOCATION CITY (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteLocationCity
);



export default router;