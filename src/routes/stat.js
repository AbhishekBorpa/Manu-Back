import express from "express";

import {
  getStats,
  createStat,
  updateStat,
  deleteStat,
} from "../controllers/statController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();



/* 🔥 GET ALL STATS */
router.get(
  "/",
  getStats
);



/* 🔥 CREATE STAT (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createStat
);



/* 🔥 UPDATE STAT (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateStat
);



/* 🔥 DELETE STAT (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteStat
);



export default router;