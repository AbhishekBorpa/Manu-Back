import mongoose from "mongoose";
import dotenv from "dotenv";
import AppBanner from "./src/models/AppBanner.js";
import Category from "./src/models/Category.js";
import City from "./src/models/City.js";
import Faq from "./src/models/Faq.js";
import Footer from "./src/models/Footer.js";
import Industry from "./src/models/Industry.js";
import Lead from "./src/models/Lead.js";
import LocationCity from "./src/models/LocationCity.js";
import Manufacturing from "./src/models/Manufacturing.js";
import Navbar from "./src/models/Navbar.js";
import Order from "./src/models/Order.js";
import PartnerInventory from "./src/models/PartnerInventory.js";
import PartnerProfile from "./src/models/PartnerProfile.js";
import Product from "./src/models/Product.js";
import Slider from "./src/models/Slider.js";
import Stat from "./src/models/Stat.js";
import Subscriber from "./src/models/Subscriber.js";
import Testimonial from "./src/models/Testimonial.js";
import User from "./src/models/User.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Clearing Data... ✅");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
};

const clearData = async () => {
  await connectDB();

  try {
    console.log("Cleaning up collections...");

    const models = [
      AppBanner, Category, City, Faq, Footer, Industry, Lead, 
      LocationCity, Manufacturing, Navbar, Order, PartnerInventory, 
      PartnerProfile, Product, Slider, Stat, Subscriber, 
      Testimonial, User
    ];

    for (const model of models) {
      const modelName = model.modelName || model.displayName;
      await model.deleteMany({});
      console.log(`- Cleared collection: ${modelName}`);
    }

    console.log("\n🚀 All data (including seed data) has been removed successfully!");
    console.log("Note: You may need to run seed scripts to recreate initial users/data.");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing data:", error);
    process.exit(1);
  }
};

clearData();
