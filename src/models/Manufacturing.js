import mongoose from "mongoose";

const manufacturingSchema =
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

      category: {
        type: String,
        trim: true,
        lowercase: true,
        default: "general",
      },

      price: {
        type: String,
        trim: true,
        default: "",
      },

      rating: {
        type: String,
        trim: true,
        default: "0",
      },

      img: {
        type: String,
        trim: true,
        default:
          "https://res.cloudinary.com/djsxaigna/image/upload/v1778687629/manufacturing_b2b/tiwud4hv6wtvt4cbgozz.jpg",
      },

      tag: {
        type: String,
        trim: true,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Manufacturing",
  manufacturingSchema
);