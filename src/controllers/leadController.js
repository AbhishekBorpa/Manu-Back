import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, project, location, budget, partnerId, notes } = req.body;

    if (!partnerId) {
      return res.status(400).json({ success: false, msg: "Supplier partner is required for this inquiry" });
    }
    
    const newLead = new Lead({
      name,
      email,
      phone,
      project,
      location,
      budget,
      partnerId,
      notes,
      buyerId: req.user ? req.user.id : null // Store buyerId if logged in
    });

    await newLead.save();
    res.status(201).json({ success: true, lead: newLead });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getMyLeads = async (req, res) => {
  try {
    const email = req.user.email.toLowerCase().trim();
    const leads = await Lead.find({
      $or: [
        { buyerId: req.user._id },
        { email: new RegExp("^" + email + "$", "i") }
      ]
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
