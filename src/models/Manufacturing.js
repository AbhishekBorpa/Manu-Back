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
        required: true,
        trim: true,
        lowercase: true,
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
        required: true,
        trim: true,
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