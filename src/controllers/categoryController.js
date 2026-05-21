import Category from "../models/Category.js";



/* 🔥 GET ALL CATEGORIES */
export const getCategories = async (
  req,
  res
) => {
  try {

    const categories =
      await Category.find()
        .sort({
          categoryId: 1,
        });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });

  } catch (err) {

    console.log(
      "GET CATEGORY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 CREATE CATEGORY */
export const createCategory = async (
  req,
  res
) => {
  try {

    let {
      name,
      subcategories,
    } = req.body;

    let icon = req.body.icon;

    /* 🔥 HANDLE SUBCATEGORIES */
    if (typeof subcategories === "string") {
      subcategories = subcategories.split(",").map(s => s.trim()).filter(s => s !== "");
    }

    /* 🔥 HANDLE CLOUDINARY UPLOAD */
    if (req.file) {
      icon = req.file.path;
    }

    /* 🔥 REQUIRED CHECK */
    if (
      !name ||
      !icon
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Name & icon (image) required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    name = name.trim();
    if (typeof icon === "string") icon = icon.trim();

    /* 🔥 CHECK DUPLICATE */
    const existingCategory =
      await Category.findOne({
        name,
      });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        msg:
          "Category already exists ❌",
      });
    }

    /* 🔥 LAST CATEGORY */
    const lastCategory =
      await Category.findOne()
        .sort({
          categoryId: -1,
        });

    /* 🔥 GENERATE ID */
    const newCategoryId =
      lastCategory
        ? lastCategory.categoryId + 1
        : 1001;

    /* 🔥 CREATE */
    const category =
      await Category.create({
        categoryId:
          newCategoryId,
        name,
        icon,
        subcategories,
      });

    res.status(201).json({
      success: true,
      msg:
        "Category created successfully ✅",
      category,
    });

  } catch (err) {

    console.log(
      "CREATE CATEGORY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 UPDATE CATEGORY */
export const updateCategory = async (
  req,
  res
) => {
  try {
    let updateData = { ...req.body };

    /* 🔥 HANDLE SUBCATEGORIES */
    if (typeof updateData.subcategories === "string") {
      updateData.subcategories = updateData.subcategories.split(",").map(s => s.trim()).filter(s => s !== "");
    }

    /* 🔥 HANDLE CLOUDINARY UPLOAD */
    if (req.file) {
      updateData.icon = req.file.path;
    }

    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        msg:
          "Category not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Category updated ✅",
      category,
    });

  } catch (err) {

    console.log(
      "UPDATE CATEGORY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 DELETE CATEGORY */
export const deleteCategory = async (
  req,
  res
) => {
  try {

    const category =
      await Category.findByIdAndDelete(
        req.params.id
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        msg:
          "Category not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Category deleted ✅",
    });

  } catch (err) {

    console.log(
      "DELETE CATEGORY ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};