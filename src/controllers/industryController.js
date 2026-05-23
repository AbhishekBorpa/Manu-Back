import Industry from "../models/Industry.js";
import { DEFAULT_INDUSTRIES } from "../constants/defaultIndustries.js";



/* 🔥 GET ALL INDUSTRIES */
export const getIndustries = async (
  req,
  res
) => {
  try {

    const industries =
      await Industry.find()
        .sort({
          createdAt: -1,
        });

    const list =
      industries.length > 0 ? industries : DEFAULT_INDUSTRIES;

    res.status(200).json({
      success: true,
      count: list.length,
      industries: list,
      isDefault: industries.length === 0,
    });

  } catch (err) {

    console.log(
      "GET INDUSTRY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 CREATE INDUSTRY */
export const createIndustry = async (
  req,
  res
) => {
  try {

    let {
      title,
      desc,
      color,
      number,
    } = req.body;

    let icon = req.body.icon;

    /* 🔥 HANDLE CLOUDINARY UPLOAD */
    if (req.file) {
      icon = req.file.path;
    }

    /* 🔥 REQUIRED CHECK */
    if (
      !title ||
      !desc ||
      !icon
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Title, description & icon (image) required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    title = title.trim();
    desc = desc.trim();
    if (typeof icon === "string") icon = icon.trim();

    if (color) {
      color = color.trim();
    }

    if (number) {
      number = number.trim();
    }

    /* 🔥 DUPLICATE CHECK */
    const existingIndustry =
      await Industry.findOne({
        title,
      });

    if (existingIndustry) {
      return res.status(400).json({
        success: false,
        msg:
          "Industry already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const industry =
      await Industry.create({
        title,
        desc,
        icon,
        color,
        number,
      });

    res.status(201).json({
      success: true,
      msg:
        "Industry added successfully ✅",
      industry,
    });

  } catch (err) {

    console.log(
      "CREATE INDUSTRY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 UPDATE INDUSTRY */
export const updateIndustry = async (
  req,
  res
) => {
  try {

    const industry =
      await Industry.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!industry) {
      return res.status(404).json({
        success: false,
        msg:
          "Industry not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Industry updated ✅",
      industry,
    });

  } catch (err) {

    console.log(
      "UPDATE INDUSTRY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 DELETE INDUSTRY */
export const deleteIndustry = async (
  req,
  res
) => {
  try {

    const industry =
      await Industry.findByIdAndDelete(
        req.params.id
      );

    if (!industry) {
      return res.status(404).json({
        success: false,
        msg:
          "Industry not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Industry deleted successfully ✅",
    });

  } catch (err) {

    console.log(
      "DELETE INDUSTRY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};