import Manufacturing from "../models/Manufacturing.js";



/* 🔥 GET ALL MANUFACTURING */
export const getManufacturing = async (
  req,
  res
) => {
  try {

    const manufacturing =
      await Manufacturing.find()
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count:
        manufacturing.length,
      manufacturing,
    });

  } catch (err) {

    console.log(
      "GET MANUFACTURING ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 CREATE MANUFACTURING */
export const createManufacturing = async (
  req,
  res
) => {
  try {

    let {
      title,
      category,
      price,
      rating,
      tag,
    } = req.body;

    let img = req.body.img;

    /* 🔥 HANDLE CLOUDINARY UPLOAD */
    if (req.file) {
      img = req.file.path;
    }

    /* 🔥 REQUIRED CHECK */
    if (
      !title
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Title (Name) required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    title = title.trim();

    if (category) {
      category = category.trim();
    } else {
      category = "general";
    }

    if (typeof img === "string") img = img.trim();
    if (!img) {
      img =
        "https://res.cloudinary.com/djsxaigna/image/upload/v1778687629/manufacturing_b2b/tiwud4hv6wtvt4cbgozz.jpg";
    }

    if (price) {
      price = price.trim();
    }

    if (rating) {
      rating = rating.trim();
    }

    if (tag) {
      tag = tag.trim();
    }

    /* 🔥 DUPLICATE CHECK */
    const existingManufacturing =
      await Manufacturing.findOne({
        title,
      });

    if (existingManufacturing) {
      return res.status(400).json({
        success: false,
        msg:
          "Manufacturing already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const manufacturing =
      await Manufacturing.create({
        title,
        category,
        price,
        rating,
        img,
        tag,
      });

    res.status(201).json({
      success: true,
      msg:
        "Manufacturing added successfully ✅",
      manufacturing,
    });

  } catch (err) {

    console.log(
      "CREATE MANUFACTURING ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 UPDATE MANUFACTURING */
export const updateManufacturing = async (
  req,
  res
) => {
  try {
    let updateData = { ...req.body };

    /* 🔥 HANDLE CLOUDINARY UPLOAD */
    if (req.file) {
      updateData.img = req.file.path;
    }

    const manufacturing =
      await Manufacturing.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!manufacturing) {
      return res.status(404).json({
        success: false,
        msg:
          "Manufacturing not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Manufacturing updated ✅",
      manufacturing,
    });

  } catch (err) {

    console.log(
      "UPDATE MANUFACTURING ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};




/* 🔥 DELETE MANUFACTURING */
export const deleteManufacturing = async (
  req,
  res
) => {
  try {

    const manufacturing =
      await Manufacturing.findByIdAndDelete(
        req.params.id
      );

    if (!manufacturing) {
      return res.status(404).json({
        success: false,
        msg:
          "Manufacturing not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Manufacturing deleted successfully ✅",
    });

  } catch (err) {

    console.log(
      "DELETE MANUFACTURING ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server Error ❌",
    });
  }
};