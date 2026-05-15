import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/Product.js";

dotenv.config();

const updateImage = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const product = await Product.findOne({ title: "Packaging System" });
    if (product) {
      // Using a known working Cloudinary image
      product.image = "https://res.cloudinary.com/djsxaigna/image/upload/v1778687629/manufacturing_b2b/tiwud4hv6wtvt4cbgozz.jpg";
      await product.save();
      console.log("Packaging System image updated to Cloudinary! ✅");
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateImage();
