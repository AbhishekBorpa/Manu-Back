import express from "express";
import { getLeads, updateLead, deleteLead } from "../controllers/leadController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware("admin"), getLeads);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateLead);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteLead);

export default router;
