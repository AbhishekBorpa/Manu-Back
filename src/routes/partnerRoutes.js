import express from 'express';
import { 
  getDashboardStats, 
  getPartnerLeads, 
  getPartnerInventory, 
  updatePartnerProfile 
} from '../controllers/partnerController.js';
import auth from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

// All routes here require authentication and 'partner' or 'admin' role
router.use(auth);
router.use(checkRole('partner', 'admin'));

router.get('/stats', getDashboardStats);
router.get('/leads', getPartnerLeads);
router.get('/inventory', getPartnerInventory);
router.post('/profile', updatePartnerProfile);

export default router;
