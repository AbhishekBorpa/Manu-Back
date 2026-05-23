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
        default: "https://via.placeholder.com/150",
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