import express from "express";
import {
  getAppBanner,
  createAppBanner
} from "../controllers/appBannerController.js";

import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAppBanner);
router.post("/", upload.single("image"), createAppBanner);

export default router;