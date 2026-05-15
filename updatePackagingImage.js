import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/Product.js";

dotenv.config();

const updateImage = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find the Packaging System product
    const product = await Product.findOne({ title: "Packaging System" });
    if (product) {
      // Update with a working Unsplash image for packaging
      product.image = "https://images.unsplash.com/photo-1605600611284-19561ad7ddf1?q=80&w=1200";
      await product.save();
      console.log("Packaging System image updated successfully! ✅");
    } else {
      console.log("Product not found.");
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateImage();
