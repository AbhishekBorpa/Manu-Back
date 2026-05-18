import mongoose from "mongoose";

const productSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 150,
      },

      desc: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000,
      },

      image: {
        type: String,
        required: true,
        trim: true,
      },

      icon: {
        type: String,
        trim: true,
        default: "",
      },

      query: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
      },

      category: {
        type: String,
        trim: true,
        default: "Industrial",
      },

      price: {
        type: Number,
        default: 0,
      },

      location: {
        type: String,
        trim: true,
        default: "Delhi",
      },

      featured: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Product",
  productSchema
);