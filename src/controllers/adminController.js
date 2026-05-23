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
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });

    // If role is changed to partner, ensure a PartnerProfile exists
    if (role === "partner") {
      const existingProfile = await PartnerProfile.findOne({ userId: user._id });
      if (!existingProfile) {
        await PartnerProfile.create({
          userId: user._id,
          companyName: user.name || "Ultra Partner",
          verificationStatus: "Not Submitted",
          plan: "Free"
        });
      }
    }

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
    // 1. Get all partner profiles
    const profiles = await PartnerProfile.find().populate("userId", "name email role").sort({ createdAt: -1 });
    
    // 2. Get all users with role 'partner' to find those missing a profile
    const partnerUsers = await User.find({ role: "partner" }).select("name email role createdAt");
    
    // 3. Create a set of user IDs who already have profiles
    const profiledUserIds = new Set(profiles.map(p => p.userId?._id?.toString() || p.userId?.toString()));
    
    // 4. Identify partners without a profile and create virtual ones for the list
    const missingProfiles = partnerUsers
      .filter(user => !profiledUserIds.has(user._id.toString()))
      .map(user => ({
        _id: `virtual-${user._id}`, // Mark as virtual
        userId: user,
        companyName: user.name || "Ultra Partner",
        verificationStatus: "Not Submitted",
        plan: "Free",
        createdAt: user.createdAt,
        isVirtual: true
      }));

    // 5. Combine and sort by creation date
    const allPartners = [...profiles, ...missingProfiles].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json({ success: true, count: allPartners.length, profiles: allPartners });
  } catch (err) {
    console.error("getPartnerProfiles Error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getPartnerProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    // Handle virtual IDs (partners without a profile document)
    if (id.startsWith("virtual-")) {
      const userId = id.replace("virtual-", "");
      const user = await User.findById(userId).select("name email role phoneNumber createdAt");
      if (!user) return res.status(404).json({ success: false, msg: "Partner user not found" });

      return res.status(200).json({
        success: true,
        profile: {
          _id: id,
          userId: user,
          companyName: user.name || "Ultra Partner",
          verificationStatus: "Not Submitted",
          plan: "Free",
          createdAt: user.createdAt,
          isVirtual: true
        }
      });
    }

    const profile = await PartnerProfile.findById(id).populate("userId", "name email role phoneNumber");
    if (!profile) return res.status(404).json({ success: false, msg: "Partner profile not found" });
    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const verifyPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending', 'Verified', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, msg: "Invalid status" });
    }

    let profile;
    if (id.startsWith("virtual-")) {
      const userId = id.replace("virtual-", "");
      profile = await PartnerProfile.create({
        userId,
        verificationStatus: status
      });
      profile = await profile.populate("userId", "name email");
    } else {
      profile = await PartnerProfile.findByIdAndUpdate(
        id, 
        { verificationStatus: status }, 
        { new: true }
      ).populate("userId", "name email");
    }

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
    const { id } = req.params;
    const allowedFields = ['companyName', 'address', 'website', 'plan', 'verificationStatus'];
    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    let profile;
    if (id.startsWith("virtual-")) {
      const userId = id.replace("virtual-", "");
      profile = await PartnerProfile.create({
        userId,
        ...updates
      });
      profile = await profile.populate("userId", "name email");
    } else {
      profile = await PartnerProfile.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      ).populate("userId", "name email");
    }

    if (!profile) return res.status(404).json({ success: false, msg: "Partner profile not found" });

    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deletePartnerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (id.startsWith("virtual-")) {
      return res.status(200).json({ success: true, msg: "Virtual partner profile cleared" });
    }

    const profile = await PartnerProfile.findByIdAndDelete(id);
    if (!profile) return res.status(404).json({ success: false, msg: "Partner profile not found" });

    res.status(200).json({ success: true, msg: "Partner profile deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
