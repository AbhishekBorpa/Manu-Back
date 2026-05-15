import mongoose from "mongoose";
import dotenv from "dotenv";
import Lead from "./src/models/Lead.js";
import User from "./src/models/User.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedLeads = async () => {
  await connectDB();

  try {
    const adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      console.log("No admin user found. Please create a user first.");
      process.exit(1);
    }

    const leads = [
      {
        name: "Acme Corp",
        email: "contact@acme.com",
        phone: "+91 9876543210",
        project: "Heavy Machinery Manufacturing",
        location: "Mumbai",
        budget: "₹50,00,000",
        status: "New",
        partnerId: adminUser._id,
        notes: "Interested in automated assembly line."
      },
      {
        name: "TechVision Solutions",
        email: "info@techvision.com",
        phone: "+91 9123456780",
        project: "Custom PCB Assembly",
        location: "Bangalore",
        budget: "₹15,00,000",
        status: "In Progress",
        partnerId: adminUser._id,
        notes: "Requires quick turnaround time."
      },
      {
        name: "Global Industries",
        email: "procurement@globalind.com",
        phone: "+91 8888888888",
        project: "Metal Fabrication",
        location: "Pune",
        budget: "₹1,20,00,000",
        status: "Converted",
        partnerId: adminUser._id,
        notes: "Long term contract signed."
      },
      {
        name: "Startup Auto",
        email: "founder@startupauto.in",
        phone: "+91 7777777777",
        project: "EV Component Prototyping",
        location: "Delhi",
        budget: "₹25,00,000",
        status: "Negotiation",
        partnerId: adminUser._id,
        notes: "Discussing final pricing for initial 100 units."
      },
      {
        name: "NextGen Robotics",
        email: "sourcing@nextgenrobo.com",
        phone: "+91 9999999999",
        project: "Robotic Arm Parts",
        location: "Chennai",
        budget: "₹75,00,000",
        status: "New",
        partnerId: adminUser._id,
        notes: "Needs high precision CNC machining."
      }
    ];

    await Lead.deleteMany(); // Clear existing
    await Lead.insertMany(leads);
    console.log("Leads seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding leads:", error);
    process.exit(1);
  }
};

seedLeads();
