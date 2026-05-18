import express from 'express';
import { 
  getDashboardStats, 
  getPartnerLeads, 
  updatePartnerLead,
  getPartnerInventory, 
  addPartnerInventory,
  updatePartnerInventory,
  deletePartnerInventory,
  updatePartnerProfile,
  submitKYC,
  getKYCStatus
} from '../controllers/partnerController.js';
import auth from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

// All routes here require authentication and 'partner' or 'admin' role
router.use(auth);
router.use(checkRole('partner', 'admin'));

router.get('/stats', getDashboardStats);
router.get('/leads', getPartnerLeads);
router.put('/leads/:id', updatePartnerLead);
router.get('/inventory', getPartnerInventory);
router.post('/inventory', addPartnerInventory);
router.put('/inventory/:id', updatePartnerInventory);
router.delete('/inventory/:id', deletePartnerInventory);
router.post('/profile', updatePartnerProfile);
router.post('/kyc', submitKYC);
router.get('/kyc-status', getKYCStatus);

export default router;
