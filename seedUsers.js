import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding Users... ✅");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
};

const seedUsers = async () => {
  await connectDB();

  try {
    // 1. Admin Account
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = {
      name: "Super Admin",
      email: "admin@ultra.com",
      password: adminPassword,
      role: "admin",
      status: "active"
    };

    // 2. Partner Account
    const partnerPassword = await bcrypt.hash("partner123", 10);
    const partner = {
      name: "Manu Partner",
      email: "partner@ultra.com",
      password: partnerPassword,
      role: "partner",
      status: "active"
    };

    // Clear existing users with these emails to avoid duplication
    await User.deleteMany({ email: { $in: ["admin@ultra.com", "partner@ultra.com"] } });
    
    await User.insertMany([admin, partner]);

    console.log("\n🚀 Default Credentials Created Successfully!");
    console.log("------------------------------------------");
    console.log("ADMIN LOGIN:");
    console.log("Email: admin@ultra.com");
    console.log("Pass:  admin123");
    console.log("\nPARTNER LOGIN:");
    console.log("Email: partner@ultra.com");
    console.log("Pass:  partner123");
    console.log("------------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedUsers();
