import mongoose from "mongoose";
import Lead from "../models/Lead.js";
import User from "../models/User.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, project, location, notes, partnerId } = req.body;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return res.status(400).json({
        success: false,
        msg: "Name, email, and phone are required",
      });
    }

    if (!project?.trim()) {
      return res.status(400).json({
        success: false,
        msg: "Product or project name is required",
      });
    }

    if (!partnerId) {
      return res.status(400).json({
        success: false,
        msg: "Supplier partner is required for this inquiry",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(partnerId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid supplier reference for this product",
      });
    }

    const partner = await User.findById(partnerId).select("role name");
    if (!partner || !["partner", "admin"].includes(partner.role)) {
      return res.status(400).json({
        success: false,
        msg: "This product is not linked to a valid supplier",
      });
    }

    const buyerId = req.user?._id || req.user?.id || null;

    const newLead = new Lead({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      project: project.trim(),
      location: location?.trim() || "Not specified",
      budget: "N/A",
      partnerId: new mongoose.Types.ObjectId(partnerId),
      notes: notes?.trim() || "",
      buyerId,
    });

    await newLead.save();

    res.status(201).json({
      success: true,
      msg: "Inquiry sent to supplier successfully",
      lead: newLead,
    });
  } catch (err) {
    console.error("CREATE LEAD ERROR:", err.message);
    res.status(500).json({ success: false, msg: "Could not save inquiry. Please try again." });
  }
};

export const getMyLeads = async (req, res) => {
  try {
    const email = req.user.email.toLowerCase().trim();
    const leads = await Lead.find({
      $or: [
        { buyerId: req.user._id },
        { email: new RegExp("^" + email + "$", "i") },
      ],
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leads.length, leads });
  } catch (err) {
    console.log("GET MY LEADS ERROR =>", err.message);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leads.length, leads });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ success: false, msg: "Lead not found" });
    res.status(200).json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, msg: "Lead not found" });
    res.status(200).json({ success: true, msg: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
