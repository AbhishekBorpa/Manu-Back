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
    const convertedLeads = await Lead.find({ partnerId, status: 'Converted' });
    
    // Calculate success rate
    const successRate = totalLeads > 0 ? ((convertedLeads.length) / totalLeads) * 100 : 0;

    // Calculate revenue from converted leads budget
    let totalRevenueValue = 0;
    convertedLeads.forEach(lead => {
      if (lead.budget) {
        // Remove currency symbols, commas and extra spaces
        const numericBudget = parseInt(lead.budget.replace(/[^\d]/g, ''), 10);
        if (!isNaN(numericBudget)) {
          totalRevenueValue += numericBudget;
        }
      }
    });

    // Format revenue for display (e.g., ₹8.4L)
    const formatRevenue = (val) => {
      if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
      if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
      if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
      return `₹${val}`;
    };

    res.json({
      totalLeads,
      activeOrders,
      successRate: Math.round(successRate),
      totalRevenue: formatRevenue(totalRevenueValue),
      revenueTrend: '+8.1%'
    });
  } catch (err) {
    console.error("Stats Error:", err);
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
    const { companyName, address, website, phone } = req.body;
    let { logo } = req.body;

    // Handle file from Cloudinary (via upload middleware)
    if (req.file) {
      logo = req.file.path;
    }
    
    let profile = await PartnerProfile.findOne({ userId: req.user.id });

    if (profile) {
      profile.companyName = companyName || profile.companyName;
      profile.address = address || profile.address;
      profile.website = website || profile.website;
      profile.logo = logo !== undefined ? logo : profile.logo;
      await profile.save();
    } else {
      profile = new PartnerProfile({
        userId: req.user.id,
        companyName: companyName || 'Ultra Partner',
        address,
        website,
        logo
      });
      await profile.save();
    }

    if (phone !== undefined) {
      const user = await User.findById(req.user.id);
      if (user) {
        user.phone = phone;
        await user.save();
      }
    }

    res.json(profile);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Submit KYC documents
// @route   POST /api/partner/kyc
export const submitKYC = async (req, res) => {
  try {
    const { gstNumber, businessRegistrationNumber, aadharNumber, panNumber } = req.body;
    let { gstDoc, businessRegDoc, aadharDoc, panDoc } = req.body;

    // Handle files from Cloudinary
    if (req.files) {
      if (req.files.gstDoc && req.files.gstDoc[0]) {
        gstDoc = req.files.gstDoc[0].path;
      }
      if (req.files.businessRegDoc && req.files.businessRegDoc[0]) {
        businessRegDoc = req.files.businessRegDoc[0].path;
      }
      if (req.files.aadharDoc && req.files.aadharDoc[0]) {
        aadharDoc = req.files.aadharDoc[0].path;
      }
      if (req.files.panDoc && req.files.panDoc[0]) {
        panDoc = req.files.panDoc[0].path;
      }
    }
    
    let profile = await PartnerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = new PartnerProfile({
        userId: req.user.id,
        companyName: req.user.name || 'Ultra Partner'
      });
    }

    profile.gstNumber = gstNumber || profile.gstNumber;
    profile.businessRegistrationNumber = businessRegistrationNumber || profile.businessRegistrationNumber;
    profile.aadharNumber = aadharNumber || profile.aadharNumber;
    profile.panNumber = panNumber || profile.panNumber;
    
    profile.gstDoc = gstDoc || profile.gstDoc;
    profile.businessRegDoc = businessRegDoc || profile.businessRegDoc;
    profile.aadharDoc = aadharDoc || profile.aadharDoc;
    profile.panDoc = panDoc || profile.panDoc;

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

// @desc    Add partner inventory
// @route   POST /api/partner/inventory
export const addPartnerInventory = async (req, res) => {
  try {
    const { name, category, sku, stock, price, description } = req.body;
    
    // Check if SKU exists
    const existing = await PartnerInventory.findOne({ sku });
    if (existing) {
      return res.status(400).json({ success: false, msg: 'SKU already exists' });
    }

    const newItem = new PartnerInventory({
      name,
      category,
      sku,
      stock,
      price,
      description,
      partnerId: req.user.id
    });

    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    console.error("Add Inventory Error:", err);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

// @desc    Update partner inventory
// @route   PUT /api/partner/inventory/:id
export const updatePartnerInventory = async (req, res) => {
  try {
    let item = await PartnerInventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, msg: 'Item not found' });
    }

    // Make sure user owns item
    if (item.partnerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, msg: 'User not authorized' });
    }

    item = await PartnerInventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, item });
  } catch (err) {
    console.error("Update Inventory Error:", err);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

// @desc    Delete partner inventory
// @route   DELETE /api/partner/inventory/:id
export const deletePartnerInventory = async (req, res) => {
  try {
    const item = await PartnerInventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, msg: 'Item not found' });
    }

    // Make sure user owns item
    if (item.partnerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, msg: 'User not authorized' });
    }

    await PartnerInventory.findByIdAndDelete(req.params.id);
    res.json({ success: true, msg: 'Item removed' });
  } catch (err) {
    console.error("Delete Inventory Error:", err);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

// @desc    Update lead status (Partner)
// @route   PUT /api/partner/leads/:id
export const updatePartnerLead = async (req, res) => {
  try {
    const { status, notes } = req.body;
    let lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, msg: 'Lead not found' });
    }

    // Verify ownership
    if (lead.partnerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, msg: 'Not authorized' });
    }

    lead = await Lead.findByIdAndUpdate(req.params.id, { status, notes }, { new: true });
    res.json({ success: true, lead });
  } catch (err) {
    console.error("Update Lead Error:", err);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};
