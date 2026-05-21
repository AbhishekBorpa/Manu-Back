import User from "../models/User.js";
import Product from "../models/Product.js";
import Lead from "../models/Lead.js";
import PartnerProfile from "../models/PartnerProfile.js";
import Order from "../models/Order.js";


export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalLeads = await Lead.countDocuments();
    
    // Calculate total revenue from paid orders
    const orders = await Order.find({ paymentStatus: "Paid" });
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalLeads,
        totalRevenue
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });
    res.status(200).json({ success: true, msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getPartnerProfiles = async (req, res) => {
  try {
    const profiles = await PartnerProfile.find().populate("userId", "name email role").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: profiles.length, profiles });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getPartnerProfileById = async (req, res) => {
  try {
    const profile = await PartnerProfile.findById(req.params.id).populate("userId", "name email role phoneNumber");
    if (!profile) return res.status(404).json({ success: false, msg: "Partner profile not found" });
    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const verifyPartner = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Verified', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, msg: "Invalid status" });
    }

    const profile = await PartnerProfile.findByIdAndUpdate(
      req.params.id, 
      { verificationStatus: status }, 
      { new: true }
    ).populate("userId", "name email");

    if (!profile) return res.status(404).json({ success: false, msg: "Partner profile not found" });

    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getKYCRequests = async (req, res) => {
  try {
    const requests = await PartnerProfile.find({ verificationStatus: 'Pending' })
      .populate("userId", "name email")
      .sort({ kycSubmittedAt: -1 });
    
    res.status(200).json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const updatePartnerProfile = async (req, res) => {
  try {
    const allowedFields = ['companyName', 'address', 'website', 'plan', 'verificationStatus'];
    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const profile = await PartnerProfile.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).populate("userId", "name email");

    if (!profile) return res.status(404).json({ success: false, msg: "Partner profile not found" });

    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deletePartnerProfile = async (req, res) => {
  try {
    const profile = await PartnerProfile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ success: false, msg: "Partner profile not found" });

    res.status(200).json({ success: true, msg: "Partner profile deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
