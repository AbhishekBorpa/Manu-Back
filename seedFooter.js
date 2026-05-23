import mongoose from "mongoose";
import dotenv from "dotenv";
import Footer from "./src/models/Footer.js";
import { DEFAULT_FOOTER } from "./src/constants/defaultFooter.js";

dotenv.config();

const seedFooter = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding Footer... ✅");

    const existing = await Footer.findOne();
    if (existing) {
      console.log("Footer already exists — skipping seed.");
      process.exit(0);
    }

    await Footer.create(DEFAULT_FOOTER);
    console.log("Footer seeded successfully! ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding footer:", error);
    process.exit(1);
  }
};

seedFooter();
