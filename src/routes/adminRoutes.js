import express from "express";
import { 
  getAdminStats, 
  getUsers, 
  updateUser, 
  deleteUser, 
  getPartnerProfiles, 
  getPartnerProfileById,
  verifyPartner,
  getKYCRequests,
  updatePartnerProfile,
  deletePartnerProfile
} from "../controllers/adminController.js";
import { 
  getServices, 
  getOrders, updateOrder, deleteOrder,
  getTestimonials, updateTestimonial, deleteTestimonial,
  getSubscribers, updateSubscriber, deleteSubscriber 
} from "../controllers/genericController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, roleMiddleware("admin"), getAdminStats);

router.get("/users", authMiddleware, roleMiddleware("admin"), getUsers);
router.put("/users/:id", authMiddleware, roleMiddleware("admin"), updateUser);
router.delete("/users/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

router.get("/services", authMiddleware, roleMiddleware("admin"), getServices);

router.get("/orders", authMiddleware, roleMiddleware("admin"), getOrders);
router.put("/orders/:id", authMiddleware, roleMiddleware("admin"), updateOrder);
router.delete("/orders/:id", authMiddleware, roleMiddleware("admin"), deleteOrder);

router.get("/testimonials", authMiddleware, roleMiddleware("admin"), getTestimonials);
router.put("/testimonials/:id", authMiddleware, roleMiddleware("admin"), updateTestimonial);
router.delete("/testimonials/:id", authMiddleware, roleMiddleware("admin"), deleteTestimonial);

router.get("/subscribers", authMiddleware, roleMiddleware("admin"), getSubscribers);
router.put("/subscribers/:id", authMiddleware, roleMiddleware("admin"), updateSubscriber);
router.delete("/subscribers/:id", authMiddleware, roleMiddleware("admin"), deleteSubscriber);

router.get("/partner-profiles", authMiddleware, roleMiddleware("admin"), getPartnerProfiles);
router.get("/partner-profiles/:id", authMiddleware, roleMiddleware("admin"), getPartnerProfileById);
router.put("/partner-profiles/:id", authMiddleware, roleMiddleware("admin"), updatePartnerProfile);
router.delete("/partner-profiles/:id", authMiddleware, roleMiddleware("admin"), deletePartnerProfile);
router.put("/partner-profiles/:id/verify", authMiddleware, roleMiddleware("admin"), verifyPartner);

router.get("/kyc-requests", authMiddleware, roleMiddleware("admin"), getKYCRequests);

export default router;
