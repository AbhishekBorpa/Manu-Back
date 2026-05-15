import Stat from "../models/Stat.js";



/* 🔥 GET ALL STATS */
export const getStats = async (
  req,
  res
) => {
  try {

    const stats =
      await Stat.find()
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: stats.length,
      stats,
    });

  } catch (err) {

    console.log(
      "GET STATS ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 CREATE STAT */
export const createStat = async (
  req,
  res
) => {
  try {

    let {
      icon,
      value,
      label,
    } = req.body;

    /* 🔥 REQUIRED CHECK */
    if (
      !icon ||
      !value ||
      !label
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Icon, value & label required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    icon = icon.trim();

    value = value.trim();

    label = label.trim();

    /* 🔥 DUPLICATE CHECK */
    const existingStat =
      await Stat.findOne({
        label,
      });

    if (existingStat) {
      return res.status(400).json({
        success: false,
        msg:
          "Stat already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const stat =
      await Stat.create({
        icon,
        value,
        label,
      });

    res.status(201).json({
      success: true,
      msg:
        "Stat added successfully ✅",
      stat,
    });

  } catch (err) {

    console.log(
      "CREATE STAT ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 UPDATE STAT */
export const updateStat = async (
  req,
  res
) => {
  try {

    const stat =
      await Stat.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!stat) {
      return res.status(404).json({
        success: false,
        msg:
          "Stat not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Stat updated ✅",
      stat,
    });

  } catch (err) {

    console.log(
      "UPDATE STAT ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 DELETE STAT */
export const deleteStat = async (
  req,
  res
) => {
  try {

    const stat =
      await Stat.findByIdAndDelete(
        req.params.id
      );

    if (!stat) {
      return res.status(404).json({
        success: false,
        msg:
          "Stat not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Stat deleted successfully ✅",
    });

  } catch (err) {

    console.log(
      "DELETE STAT ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};