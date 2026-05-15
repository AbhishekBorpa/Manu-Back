import Lead from '../models/Lead.js';
import PartnerInventory from '../models/PartnerInventory.js';
import PartnerProfile from '../models/PartnerProfile.js';
import User from '../models/User.js';

// @desc    Get partner dashboard stats
// @route   GET /api/partner/stats
// @access  Private (Partner)
export const getDashboardStats = async (req, res) => {
  try {
    const partnerId = req.user.id;

    const totalLeads = await Lead.countDocuments({ partnerId });
    const activeOrders = await Lead.countDocuments({ partnerId, status: 'In Progress' });
    const convertedLeads = await Lead.countDocuments({ partnerId, status: 'Converted' });
    
    // Calculate success rate
    const successRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

    res.json({
      totalLeads,
      activeOrders,
      successRate: Math.round(successRate),
      totalRevenue: '₹8.4L',
      revenueTrend: '+8.1%'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get all leads for a partner
// @route   GET /api/partner/leads
export const getPartnerLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ partnerId: req.user.id }).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get all inventory for a partner
// @route   GET /api/partner/inventory
export const getPartnerInventory = async (req, res) => {
  try {
    const inventory = await PartnerInventory.find({ partnerId: req.user.id }).sort({ createdAt: -1 });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Update partner profile
// @route   POST /api/partner/profile
export const updatePartnerProfile = async (req, res) => {
  try {
    const { companyName, address, website } = req.body;
    
    let profile = await PartnerProfile.findOne({ userId: req.user.id });

    if (profile) {
      profile.companyName = companyName || profile.companyName;
      profile.address = address || profile.address;
      profile.website = website || profile.website;
      await profile.save();
    } else {
      profile = new PartnerProfile({
        userId: req.user.id,
        companyName,
        address,
        website
      });
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Submit KYC documents
// @route   POST /api/partner/kyc
export const submitKYC = async (req, res) => {
  try {
    const { gstNumber, businessRegistrationNumber, gstDoc, businessRegDoc } = req.body;
    
    let profile = await PartnerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: 'Partner profile not found. Please update your profile first.' });
    }

    profile.gstNumber = gstNumber || profile.gstNumber;
    profile.businessRegistrationNumber = businessRegistrationNumber || profile.businessRegistrationNumber;
    profile.gstDoc = gstDoc || profile.gstDoc;
    profile.businessRegDoc = businessRegDoc || profile.businessRegDoc;
    profile.verificationStatus = 'Pending';
    profile.kycSubmittedAt = new Date();

    await profile.save();

    res.json({ success: true, profile });
  } catch (err) {
    console.error("KYC Submit Error:", err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get KYC status
// @route   GET /api/partner/kyc-status
export const getKYCStatus = async (req, res) => {
  try {
    const profile = await PartnerProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.json({ success: true, status: 'Not Submitted', profile: null });
    }
    res.json({ success: true, status: profile.verificationStatus, profile });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
