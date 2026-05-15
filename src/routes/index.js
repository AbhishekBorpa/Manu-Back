import express from "express";

// 🔥 ROUTE IMPORTS
import authRoutes from "./auth.js";
import appBannerRoutes from "./appBanner.js";
import sliderRoutes from "./slider.js";
import categoryRoutes from "./category.js";
import faqRoutes from "./faq.js";
import productRoutes from "./product.js";
import industryRoutes from "./industry.js";
import cityRoutes from "./city.js";
import testimonialRoutes from "./testimonial.js";
import statRoutes from "./stat.js";
import manufacturingRoutes from "./manufacturing.js";
import footerRoutes from "./footer.js";
import navbarRoutes from "./navbar.js";
import locationCityRoutes from "./locationCity.js";
import leadRoutes from "./lead.js";
import partnerRoutes from "./partnerRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

// 🔥 MOUNT ROUTES
router.use("/auth", authRoutes);
router.use("/app-banner", appBannerRoutes);
router.use("/sliders", sliderRoutes);
router.use("/categories", categoryRoutes);
router.use("/faqs", faqRoutes);
router.use("/products", productRoutes);
router.use("/industries", industryRoutes);
router.use("/cities", cityRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/stats", statRoutes);
router.use("/manufacturing", manufacturingRoutes);
router.use("/footer", footerRoutes);
router.use("/navbar", navbarRoutes);
router.use("/location-cities", locationCityRoutes);
router.use("/partner", partnerRoutes);
router.use("/leads", leadRoutes);
router.use("/admin", adminRoutes);

export default router;
