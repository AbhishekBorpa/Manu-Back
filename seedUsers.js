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
      name: "Admin User",
      email: "admin@ultra.com",
      password: adminPassword,
      role: "admin"
    };

    // 2. Seller (Partner) Account
    const sellerPassword = await bcrypt.hash("seller123", 10);
    const seller = {
      name: "Seller User",
      email: "seller@ultra.com",
      password: sellerPassword,
      role: "partner"
    };

    // 3. Buyer (User) Account
    const buyerPassword = await bcrypt.hash("buyer123", 10);
    const buyer = {
      name: "Buyer User",
      email: "buyer@ultra.com",
      password: buyerPassword,
      role: "user"
    };

    // Clear existing users with these emails to avoid duplication
    await User.deleteMany({ email: { $in: ["admin@ultra.com", "seller@ultra.com", "buyer@ultra.com"] } });
    
    await User.insertMany([admin, seller, buyer]);

    console.log("\n🚀 Default Credentials Created Successfully!");
    console.log("------------------------------------------");
    console.log("ADMIN:");
    console.log("Email: admin@ultra.com | Pass: admin123");
    console.log("\nSELLER (Partner):");
    console.log("Email: seller@ultra.com | Pass: seller123");
    console.log("\nBUYER (User):");
    console.log("Email: buyer@ultra.com  | Pass: buyer123");
    console.log("------------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedUsers();
