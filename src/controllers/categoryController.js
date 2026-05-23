import Category from "../models/Category.js";



/* 🔥 GET ALL CATEGORIES */
export const getCategories = async (
  req,
  res
) => {
  try {

    const categories =
      await Category.find()
        .populate("parentCategory", "title")
        .sort({
          createdAt: -1,
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
      parentCategory,
    } = req.body;

    let icon = req.body.icon;

    /* 🔥 HANDLE CLOUDINARY UPLOAD */
    if (req.file) {
      icon = req.file.path;
    }

    /* 🔥 REQUIRED CHECK */
    if (
      !name ||
      !parentCategory
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Name & parent category required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    name = name.trim();
    if (typeof icon === "string") icon = icon.trim();
    if (!icon) {
      icon =
        "https://res.cloudinary.com/djsxaigna/image/upload/v1778687629/manufacturing_b2b/tiwud4hv6wtvt4cbgozz.jpg";
    }

    /* 🔥 CHECK DUPLICATE */
    const existingCategory =
      await Category.findOne({
        name,
      });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        msg:
          "Subcategory already exists ❌",
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
        ? (lastCategory.categoryId || 1000) + 1
        : 1001;

    /* 🔥 CREATE */
    const category =
      await Category.create({
        categoryId:
          newCategoryId,
        name,
        icon,
        parentCategory,
      });

    res.status(201).json({
      success: true,
      msg:
        "Subcategory created successfully ✅",
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

    /* 🔥 HANDLE CLOUDINARY UPLOAD */
    if (req.file) {
      updateData.icon = req.file.path;
    }

    /* 🔥 CLEAN DATA */
    if (updateData.name) updateData.name = updateData.name.trim();

    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).populate("parentCategory", "title");

    if (!category) {
      return res.status(404).json({
        success: false,
        msg:
          "Subcategory not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Subcategory updated ✅",
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