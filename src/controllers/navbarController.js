import Navbar from "../models/Navbar.js";



/* 🔥 GET NAVBAR */
export const getNavbar = async (
  req,
  res
) => {
  try {

    const navbar =
      await Navbar.findOne();

    if (!navbar) {
      return res.status(404).json({
        success: false,
        msg:
          "Navbar data not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      navbar,
    });

  } catch (err) {

    console.log(
      "GET NAVBAR ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 CREATE NAVBAR */
export const createNavbar = async (
  req,
  res
) => {
  try {

    /* 🔥 CHECK EXISTING */
    const existingNavbar =
      await Navbar.findOne();

    if (existingNavbar) {
      return res.status(400).json({
        success: false,
        msg:
          "Navbar already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const navbar =
      await Navbar.create(
        req.body
      );

    res.status(201).json({
      success: true,
      msg:
        "Navbar added successfully ✅",
      navbar,
    });

  } catch (err) {

    console.log(
      "CREATE NAVBAR ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 UPDATE NAVBAR */
export const updateNavbar = async (
  req,
  res
) => {
  try {

    const navbar =
      await Navbar.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!navbar) {
      return res.status(404).json({
        success: false,
        msg:
          "Navbar not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Navbar updated ✅",
      navbar,
    });

  } catch (err) {

    console.log(
      "UPDATE NAVBAR ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 DELETE NAVBAR */
export const deleteNavbar = async (
  req,
  res
) => {
  try {

    const navbar =
      await Navbar.findByIdAndDelete(
        req.params.id
      );

    if (!navbar) {
      return res.status(404).json({
        success: false,
        msg:
          "Navbar not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Navbar deleted successfully ✅",
    });

  } catch (err) {

    console.log(
      "DELETE NAVBAR ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};