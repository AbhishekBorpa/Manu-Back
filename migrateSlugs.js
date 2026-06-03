import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/Product.js";

dotenv.config();

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const products = await Product.find({ slug: { $exists: false } });
    console.log(`Found ${products.length} products without slugs`);

    for (const product of products) {
      product.slug = slugify(product.title);
      await product.save();
      console.log(`Updated slug for: ${product.title}`);
    }

    console.log("Migration completed");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migrate();
