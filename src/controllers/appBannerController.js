import AppBanner from "../models/AppBanner.js";
import { DEFAULT_APP_BANNER } from "../constants/defaultAppBanner.js";

/* 🔥 GET BANNER */
export const getAppBanner = async (req, res) => {
  try {

    const banner = await AppBanner.findOne();

    if (!banner) {
      return res.status(200).json({
        success: true,
        banner: DEFAULT_APP_BANNER,
        isDefault: true,
      });
    }

    res.status(200).json({ success: true, banner });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error ❌",
    });
  }
};



/* 🔥 CREATE BANNER */
export const createAppBanner = async (req, res) => {
  try {

    /* 🔥 CHECK EXISTING */
    const existingBanner =
      await AppBanner.findOne();

    if (existingBanner) {
      return res.status(400).json({
        msg: "Banner already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const bannerData = { ...req.body };
    if (req.file) {
      bannerData.image = req.file.path;
    }

    const banner = await AppBanner.create(bannerData);

    res.status(201).json({
      msg: "Banner created successfully ✅",
      banner,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error ❌",
    });
  }
};



/* 🔥 UPDATE BANNER */
export const updateAppBanner = async (req, res) => {
  try {

    const banner =
      await AppBanner.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!banner) {
      return res.status(404).json({
        msg: "Banner not found ❌",
      });
    }

    res.status(200).json({
      msg: "Banner updated ✅",
      banner,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error ❌",
    });
  }
};



/* 🔥 DELETE BANNER */
export const deleteAppBanner = async (req, res) => {
  try {

    const banner =
      await AppBanner.findByIdAndDelete(
        req.params.id
      );

    if (!banner) {
      return res.status(404).json({
        msg: "Banner not found ❌",
      });
    }

    res.status(200).json({
      msg: "Banner deleted ✅",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error ❌",
    });
  }
};