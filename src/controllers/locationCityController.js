import LocationCity from "../models/LocationCity.js";



/* 🔥 GET ALL LOCATION CITIES */
export const getLocationCities = async (
  req,
  res
) => {
  try {

    const cities =
      await LocationCity.find()
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: cities.length,
      cities,
    });

  } catch (err) {

    console.log(
      "GET LOCATION CITY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 CREATE LOCATION CITY */
export const createLocationCity = async (
  req,
  res
) => {
  try {

    let {
      name,
      image,
      state,
    } = req.body;

    /* 🔥 REQUIRED CHECK */
    if (!name) {
      return res.status(400).json({
        success: false,
        msg:
          "City name required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    name = name.trim();

    if (image) {
      image = image.trim();
    }

    if (state) {
      state = state.trim();
    }

    /* 🔥 DUPLICATE CHECK */
    const existingCity =
      await LocationCity.findOne({
        name,
      });

    if (existingCity) {
      return res.status(400).json({
        success: false,
        msg:
          "City already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const city =
      await LocationCity.create({
        name,
        image,
        state,
      });

    res.status(201).json({
      success: true,
      msg:
        "Location city added successfully ✅",
      city,
    });

  } catch (err) {

    console.log(
      "CREATE LOCATION CITY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 UPDATE LOCATION CITY */
export const updateLocationCity = async (
  req,
  res
) => {
  try {

    const city =
      await LocationCity.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!city) {
      return res.status(404).json({
        success: false,
        msg:
          "Location city not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Location city updated ✅",
      city,
    });

  } catch (err) {

    console.log(
      "UPDATE LOCATION CITY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 DELETE LOCATION CITY */
export const deleteLocationCity = async (
  req,
  res
) => {
  try {

    const city =
      await LocationCity.findByIdAndDelete(
        req.params.id
      );

    if (!city) {
      return res.status(404).json({
        success: false,
        msg:
          "Location city not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Location city deleted successfully ✅",
    });

  } catch (err) {

    console.log(
      "DELETE LOCATION CITY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};