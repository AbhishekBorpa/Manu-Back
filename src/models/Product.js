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