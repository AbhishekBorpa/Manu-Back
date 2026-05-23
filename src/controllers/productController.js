import Product from "../models/Product.js";
import { formatValidationError } from "../utils/formatValidationError.js";

const MIN_DESC_LENGTH = 10;

const validateProductDescriptions = (shortDescription, longDescription) => {
  const short = (shortDescription || "").trim();
  const long = (longDescription || "").trim();

  if (short.length < MIN_DESC_LENGTH) {
    return `Short description must be at least ${MIN_DESC_LENGTH} characters (currently ${short.length})`;
  }
  if (long.length < MIN_DESC_LENGTH) {
    return `Long description must be at least ${MIN_DESC_LENGTH} characters (currently ${long.length})`;
  }
  return null;
};



/* 🔥 GET FEATURED PRODUCTS */
export const getFeaturedProducts = async (
  req,
  res
) => {
  try {

    const products =
      await Product.find({
        featured: true,
      })
        .sort("-createdAt")
        .limit(4)
        .lean();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (err) {

    console.log(
      "GET FEATURED PRODUCT ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
      error: err.message,
    });
  }
};




/* 🔥 GET ALL PRODUCTS */
export const getProducts = async (
  req,
  res
) => {
  try {

    const products =
      await Product.find()
        .sort("-createdAt")
        .lean();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (err) {

    console.log(
      "GET PRODUCT ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
      error: err.message,
    });
  }
};

/* 🔥 GET SINGLE PRODUCT */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log("GET PRODUCT BY ID ERROR:", err.message);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

/* 🔥 CREATE PRODUCT */
export const createProduct = async (
  req,
  res
) => {
  try {

    let {
      title,
      shortDescription,
      longDescription,
      mobileNumber,
      featured,
      category,
      subcategory,
      location,
      partnerId,
    } = req.body;

    let image = req.body.image;
    let icon = req.body.icon;

    /* 🔥 HANDLE FILES FROM CLOUDINARY */
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        image = req.files.image[0].path;
      }
      if (req.files.icon && req.files.icon[0]) {
        icon = req.files.icon[0].path;
      }
    }

    /* 🔥 REQUIRED CHECK */
    if (
      !title ||
      !shortDescription ||
      !longDescription ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Title, descriptions & image required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    title = title.trim();
    shortDescription = shortDescription.trim();
    longDescription = longDescription.trim();
    if (typeof image === "string") image = image.trim();
    if (typeof icon === "string") icon = icon.trim();

    const descError = validateProductDescriptions(shortDescription, longDescription);
    if (descError) {
      return res.status(400).json({ success: false, msg: descError });
    }

    /* 🔥 DUPLICATE CHECK */
    const existingProduct =
      await Product.findOne({
        title,
      });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        msg:
          "Product already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const product =
      await Product.create({
        title,
        shortDescription,
        longDescription,
        mobileNumber,
        image,
        icon,
        featured,
        category,
        subcategory,
        location,
        partnerId: partnerId || undefined,
      });

    res.status(201).json({
      success: true,
      msg:
        "Product created successfully ✅",
      product,
    });

  } catch (err) {
    console.log("CREATE PRODUCT ERROR:", err.message);

    const status = err.name === "ValidationError" || err.code === 11000 ? 400 : 500;
    res.status(status).json({
      success: false,
      msg: formatValidationError(err),
    });
  }
};




/* 🔥 UPDATE PRODUCT */
export const updateProduct = async (
  req,
  res
) => {
  try {
    let updateData = { ...req.body };

    if (updateData.shortDescription !== undefined || updateData.longDescription !== undefined) {
      const existing = await Product.findById(req.params.id).lean();
      if (!existing) {
        return res.status(404).json({ success: false, msg: "Product not found ❌" });
      }
      const short =
        updateData.shortDescription !== undefined
          ? String(updateData.shortDescription).trim()
          : existing.shortDescription;
      const long =
        updateData.longDescription !== undefined
          ? String(updateData.longDescription).trim()
          : existing.longDescription;
      const descError = validateProductDescriptions(short, long);
      if (descError) {
        return res.status(400).json({ success: false, msg: descError });
      }
    }

    /* 🔥 HANDLE FILES FROM CLOUDINARY */
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        updateData.image = req.files.image[0].path;
      }
      if (req.files.icon && req.files.icon[0]) {
        updateData.icon = req.files.icon[0].path;
      }
    }

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        msg:
          "Product not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Product updated ✅",
      product,
    });

  } catch (err) {
    console.log("UPDATE PRODUCT ERROR:", err.message);

    const status = err.name === "ValidationError" || err.code === 11000 ? 400 : 500;
    res.status(status).json({
      success: false,
      msg: formatValidationError(err),
    });
  }
};




/* 🔥 DELETE PRODUCT */
export const deleteProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        msg:
          "Product not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "Product deleted successfully ✅",
    });

  } catch (err) {

    console.log(
      "DELETE PRODUCT ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};