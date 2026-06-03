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

      slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
      },

      shortDescription: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 500,
      },

      longDescription: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 5000,
      },

      mobileNumber: {
        type: String,
        trim: true,
        default: "",
      },

      images: {
        type: [String],
        required: true,
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

      subcategory: {
        type: String,
        trim: true,
        default: "",
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

      partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
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