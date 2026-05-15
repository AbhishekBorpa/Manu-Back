import City from "../models/City.js";



/* 🔥 GET ALL CITIES */
export const getCities = async (
  req,
  res
) => {
  try {

    const cities =
      await City.find()
        .sort({
          name: 1,
        });

    res.status(200).json({
      success: true,
      count: cities.length,
      cities,
    });

  } catch (err) {

    console.log(
      "GET CITY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 CREATE CITY */
export const createCity = async (
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

    /* 🔥 CLEAN */
    name = name.trim();

    if (image) {
      image = image.trim();
    }

    if (state) {
      state = state.trim();
    }

    /* 🔥 DUPLICATE CHECK */
    const existingCity =
      await City.findOne({
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
      await City.create({
        name,
        image,
        state,
      });

    res.status(201).json({
      success: true,
      msg:
        "City added successfully ✅",
      city,
    });

  } catch (err) {

    console.log(
      "CREATE CITY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 UPDATE CITY */
export const updateCity = async (
  req,
  res
) => {
  try {

    const city =
      await City.findByIdAndUpdate(
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
          "City not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "City updated ✅",
      city,
    });

  } catch (err) {

    console.log(
      "UPDATE CITY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 DELETE CITY */
export const deleteCity = async (
  req,
  res
) => {
  try {

    const city =
      await City.findByIdAndDelete(
        req.params.id
      );

    if (!city) {
      return res.status(404).json({
        success: false,
        msg:
          "City not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "City deleted ✅",
    });

  } catch (err) {

    console.log(
      "DELETE CITY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};