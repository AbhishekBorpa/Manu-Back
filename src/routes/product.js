import express from "express";

import {
  getFeaturedProducts,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();



/* 🔥 GET ALL PRODUCTS */
router.get(
  "/",
  getProducts
);



/* 🔥 GET FEATURED PRODUCTS */
router.get(
  "/featured",
  getFeaturedProducts
);

router.get("/:id", getProductById);

/* 🔥 CREATE PRODUCT (ADMIN) */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "icon", maxCount: 1 },
  ]),
  createProduct
);



/* 🔥 UPDATE PRODUCT (ADMIN) */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "icon", maxCount: 1 },
  ]),
  updateProduct
);



/* 🔥 DELETE PRODUCT (ADMIN) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteProduct
);



export default router;