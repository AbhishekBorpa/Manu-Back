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
import upload from '../middlewares/upload.js';

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
router.post('/profile', upload.single('logo'), updatePartnerProfile);
router.post('/kyc', upload.fields([
  { name: 'gstDoc', maxCount: 1 },
  { name: 'businessRegDoc', maxCount: 1 },
  { name: 'aadharDoc', maxCount: 1 },
  { name: 'panDoc', maxCount: 1 }
]), submitKYC);
router.get('/kyc-status', getKYCStatus);

export default router;
