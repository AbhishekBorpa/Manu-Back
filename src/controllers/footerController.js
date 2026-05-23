import Footer from "../models/Footer.js";
import { DEFAULT_FOOTER } from "../constants/defaultFooter.js";



/* 🔥 GET FOOTER */
export const getFooter = async (
  req,
  res
) => {
  try {

    const footer =
      await Footer.findOne();

    if (!footer) {
      return res.status(200).json({
        success: true,
        footer: DEFAULT_FOOTER,
        isDefault: true,
      });
    }

    res.status(200).json({
      success: true,
      footer,
    });

  } catch (err) {

    console.log(
      "GET FOOTER ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 CREATE FOOTER */
export const createFooter = async (
  req,
  res
) => {
  try {

    /* 🔥 CHECK EXISTING */
    const existingFooter =
      await Footer.findOne();

    if (existingFooter) {
      return res.status(400).json({
        success: false,
        msg:
          "Footer already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const footer =
      await Footer.create(
        req.body
      );

    res.status(201).json({
      success: true,
      msg:
        "Footer added successfully ✅",
      footer,
    });

  } catch (err) {

    console.log(
      "CREATE FOOTER ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 UPDATE FOOTER */
export const updateFooter = async (
  req,
  res
) => {
  try {

    const footer =
      await Footer.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!footer) {
      return res.status(404).json({
        success: false,
        msg:
          "Footer not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Footer updated ✅",
      footer,
    });

  } catch (err) {

    console.log(
      "UPDATE FOOTER ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 DELETE FOOTER */
export const deleteFooter = async (
  req,
  res
) => {
  try {

    const footer =
      await Footer.findByIdAndDelete(
        req.params.id
      );

    if (!footer) {
      return res.status(404).json({
        success: false,
        msg:
          "Footer not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Footer deleted successfully ✅",
    });

  } catch (err) {

    console.log(
      "DELETE FOOTER ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};