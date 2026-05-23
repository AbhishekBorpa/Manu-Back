import express from "express";
import { getLeads, updateLead, deleteLead, createLead, getMyLeads } from "../controllers/leadController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import optionalAuthMiddleware from "../middlewares/optionalAuthMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public: create a lead (guest or logged-in buyer)
router.post("/", optionalAuthMiddleware, createLead);

// Buyer: get my own leads
router.get("/my-queries", authMiddleware, getMyLeads);

// Admin: manage all leads
router.get("/", authMiddleware, roleMiddleware("admin"), getLeads);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateLead);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteLead);

export default router;

