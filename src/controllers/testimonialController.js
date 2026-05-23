import Testimonial from "../models/Testimonial.js";
import { DEFAULT_TESTIMONIALS } from "../constants/defaultTestimonials.js";



/* 🔥 GET ALL TESTIMONIALS */
export const getTestimonials = async (
  req,
  res
) => {
  try {

    const testimonials =
      await Testimonial.find()
        .sort({
          createdAt: -1,
        });

    const list =
      testimonials.length > 0
        ? testimonials
        : DEFAULT_TESTIMONIALS;

    res.status(200).json({
      success: true,
      count: list.length,
      testimonials: list,
      isDefault: testimonials.length === 0,
    });

  } catch (err) {

    console.log(
      "GET TESTIMONIAL ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 CREATE TESTIMONIAL */
export const createTestimonial = async (
  req,
  res
) => {
  try {

    let {
      text,
      name,
      location,
      color,
    } = req.body;

    /* 🔥 REQUIRED CHECK */
    if (
      !text ||
      !name ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Text, name & location required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    text = text.trim();

    name = name.trim();

    location =
      location.trim();

    if (color) {
      color = color.trim();
    }

    /* 🔥 DUPLICATE CHECK */
    const existingTestimonial =
      await Testimonial.findOne({
        text,
      });

    if (existingTestimonial) {
      return res.status(400).json({
        success: false,
        msg:
          "Testimonial already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const testimonial =
      await Testimonial.create({
        text,
        name,
        location,
        color,
      });

    res.status(201).json({
      success: true,
      msg:
        "Testimonial created successfully ✅",
      testimonial,
    });

  } catch (err) {

    console.log(
      "CREATE TESTIMONIAL ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 UPDATE TESTIMONIAL */
export const updateTestimonial = async (
  req,
  res
) => {
  try {

    const testimonial =
      await Testimonial.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        msg:
          "Testimonial not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Testimonial updated ✅",
      testimonial,
    });

  } catch (err) {

    console.log(
      "UPDATE TESTIMONIAL ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 DELETE TESTIMONIAL */
export const deleteTestimonial = async (
  req,
  res
) => {
  try {

    const testimonial =
      await Testimonial.findByIdAndDelete(
        req.params.id
      );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        msg:
          "Testimonial not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Testimonial deleted successfully ✅",
    });

  } catch (err) {

    console.log(
      "DELETE TESTIMONIAL ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};