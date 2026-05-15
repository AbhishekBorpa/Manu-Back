import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import PartnerProfile from "./src/models/PartnerProfile.js";

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

const seedPartnerProfiles = async () => {
  await connectDB();

  try {
    // Find some partners
    const partners = await User.find({ role: "partner" });
    
    if (partners.length === 0) {
      console.log("No partners found to create profiles for. Please create some partner users first.");
      process.exit(0);
    }

    const profiles = partners.map(partner => ({
      userId: partner._id,
      companyName: `${partner.name.split(' ')[0]} Manufacturing Ltd.`,
      address: "123 Industrial Area, Phase II",
      website: `www.${partner.name.split(' ')[0].toLowerCase()}fab.com`,
      verificationStatus: "Pending",
      plan: "Basic"
    }));

    await PartnerProfile.deleteMany(); // Clear existing
    await PartnerProfile.insertMany(profiles);
    
    console.log(`${profiles.length} Partner Profiles seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding partner profiles:", error);
    process.exit(1);
  }
};

seedPartnerProfiles();
