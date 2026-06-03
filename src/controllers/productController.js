import Product from "../models/Product.js";
import { formatValidationError } from "../utils/formatValidationError.js";

const MIN_DESC_LENGTH = 10;

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
};

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
      products: products.map(p => ({
        ...p,
        image: p.images && p.images.length > 0 ? p.images[0] : (p.image || p.img)
      })),
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
      products: products.map(p => ({
        ...p,
        image: p.images && p.images.length > 0 ? p.images[0] : (p.image || p.img)
      })),
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
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-H]{24}$/)) {
      product = await Product.findById(id).lean();
    } else {
      product = await Product.findOne({ slug: id }).lean();
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: {
        ...product,
        image: product.images && product.images.length > 0 ? product.images[0] : (product.image || product.img)
      },
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
      slug,
      shortDescription,
      longDescription,
      mobileNumber,
      featured,
      category,
      subcategory,
      location,
      partnerId,
    } = req.body;

    let images = [];
    let icon = req.body.icon;

    /* 🔥 HANDLE FILES FROM CLOUDINARY */
    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        images = req.files.image.map(file => file.path);
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
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Title, descriptions & at least one image required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    title = title.trim();
    slug = slug ? slug.trim().toLowerCase() : slugify(title);
    shortDescription = shortDescription.trim();
    longDescription = longDescription.trim();
    if (typeof icon === "string") icon = icon.trim();

    const descError = validateProductDescriptions(shortDescription, longDescription);
    if (descError) {
      return res.status(400).json({ success: false, msg: descError });
    }

    /* 🔥 DUPLICATE CHECK */
    const existingProduct =
      await Product.findOne({
        $or: [{ title }, { slug }]
      });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        msg:
          existingProduct.title === title ? "Product title already exists ❌" : "Product slug already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const product =
      await Product.create({
        title,
        slug,
        shortDescription,
        longDescription,
        mobileNumber,
        images,
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
      product: {
        ...product.toObject(),
        image: product.images && product.images.length > 0 ? product.images[0] : (product.image || product.img)
      },
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

    const existing = await Product.findById(req.params.id).lean();
    if (!existing) {
      return res.status(404).json({ success: false, msg: "Product not found ❌" });
    }

    if (updateData.title && !updateData.slug) {
      updateData.slug = slugify(updateData.title);
    } else if (updateData.slug) {
      updateData.slug = updateData.slug.trim().toLowerCase();
    }

    if (updateData.title || updateData.slug) {
      const duplicateQuery = { _id: { $ne: req.params.id } };
      const orConditions = [];
      if (updateData.title) orConditions.push({ title: updateData.title });
      if (updateData.slug) orConditions.push({ slug: updateData.slug });
      
      if (orConditions.length > 0) {
        duplicateQuery.$or = orConditions;
        const duplicate = await Product.findOne(duplicateQuery);
        if (duplicate) {
          return res.status(400).json({
            success: false,
            msg: duplicate.title === updateData.title ? "Product title already exists ❌" : "Product slug already exists ❌",
          });
        }
      }
    }

    if (updateData.shortDescription !== undefined || updateData.longDescription !== undefined) {
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
      if (req.files.image && req.files.image.length > 0) {
        updateData.images = req.files.image.map(file => file.path);
      }
      if (req.files.icon && req.files.icon[0]) {
        updateData.icon = req.files.icon[0].path;
      }
    }

    if (updateData.images && typeof updateData.images === 'string') {
      updateData.images = [updateData.images];
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
      product: {
        ...product.toObject(),
        image: product.images && product.images.length > 0 ? product.images[0] : (product.image || product.img)
      },
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