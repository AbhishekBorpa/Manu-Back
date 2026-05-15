import express from "express";
import { getLeads, updateLead, deleteLead, createLead, getMyLeads } from "../controllers/leadController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public/Semi-public: create a lead (can be logged in or guest)
router.post("/", (req, res, next) => {
  // Optional auth: if token exists, verify it, otherwise proceed as guest
  const token = req.header("Authorization");
  if (token) return authMiddleware(req, res, next);
  next();
}, createLead);

// Buyer: get my own leads
router.get("/my-queries", authMiddleware, getMyLeads);

// Admin: manage all leads
router.get("/", authMiddleware, roleMiddleware("admin"), getLeads);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateLead);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteLead);

export default router;

