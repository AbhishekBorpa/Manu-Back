import mongoose from "mongoose";
import dotenv from "dotenv";
import Testimonial from "./src/models/Testimonial.js";

dotenv.config();

const addTestimonial = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const newTestimonial = new Testimonial({
      name: "Rajesh Kumar",
      text: "UltraClap has been a game-changer for our manufacturing plant. The packaging machines are highly efficient and the maintenance support is top-notch.",
      location: "Bhiwadi, India",
      color: "green",
      isActive: true
    });

    await newTestimonial.save();
    console.log("Testimonial added successfully! ✅");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

addTestimonial();
