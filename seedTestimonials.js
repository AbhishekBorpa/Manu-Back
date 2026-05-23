import mongoose from "mongoose";
import dotenv from "dotenv";
import Testimonial from "./src/models/Testimonial.js";
import { DEFAULT_TESTIMONIALS } from "./src/constants/defaultTestimonials.js";

dotenv.config();

const seedTestimonials = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding Testimonials... ✅");

    const existing = await Testimonial.countDocuments();
    if (existing >= 4) {
      console.log(`${existing} testimonials already exist — skipping seed.`);
      process.exit(0);
    }

    for (const item of DEFAULT_TESTIMONIALS) {
      const { _id, ...data } = item;
      const found = await Testimonial.findOne({ text: data.text });
      if (!found) {
        await Testimonial.create(data);
      }
    }

    console.log("4 testimonials seeded successfully! ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding testimonials:", error);
    process.exit(1);
  }
};

seedTestimonials();
