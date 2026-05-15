import Slider from "../models/Slider.js";

/* 🔥 GET ALL SLIDES */
export const getSlides = async (req, res) => {
  try {
    const slides = await Slider.find();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* 🔥 CREATE SLIDE */
export const createSlide = async (req, res) => {
  try {
    const slideData = { ...req.body };
    if (req.file) {
      slideData.image = req.file.path;
    }
    const slide = new Slider(slideData);
    await slide.save();
    res.json({ msg: "Slide created successfully ✅", slide });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};