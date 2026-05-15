import Product from "../models/Product.js";



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
        .sort({
          createdAt: -1,
        })
        .limit(4);

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
        .sort({
          createdAt: -1,
        });

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
      desc,
      featured,
      category,
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
      !desc ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Title, description & image required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    title = title.trim();
    desc = desc.trim();
    if (typeof image === "string") image = image.trim();
    if (typeof icon === "string") icon = icon.trim();

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
        desc,
        image,
        icon,
        featured,
        category,
      });

    res.status(201).json({
      success: true,
      msg:
        "Product created successfully ✅",
      product,
    });

  } catch (err) {

    console.log(
      "CREATE PRODUCT ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 UPDATE PRODUCT */
export const updateProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
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

    console.log(
      "UPDATE PRODUCT ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
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