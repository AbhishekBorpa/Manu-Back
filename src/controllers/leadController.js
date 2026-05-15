import Lead from "../models/Lead.js";

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
