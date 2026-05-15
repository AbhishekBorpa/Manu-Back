import express from "express";
import { getSlides, createSlide } from "../controllers/sliderController.js";

import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getSlides);
router.post("/", upload.single("image"), createSlide);

export default router;