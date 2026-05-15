import mongoose from "mongoose";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const sliderSchema = new mongoose.Schema({
  title: String,
  highlight: String,
  desc: String,
  image: String,
}, { timestamps: true });

export default mongoose.model("Slider", sliderSchema);