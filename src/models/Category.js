import mongoose from "mongoose";

const categorySchema =
  new mongoose.Schema(
    {
      categoryId: {
        type: Number,
        unique: true,
        required: true,
        index: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 100,
      },

      parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manufacturing",
        required: true,
      },

      icon: {
        type: String,
        trim: true,
        default:
          "https://res.cloudinary.com/djsxaigna/image/upload/v1778687629/manufacturing_b2b/tiwud4hv6wtvt4cbgozz.jpg",
      },

      type: {
        type: String,
        enum: ["industry", "machine"],
        default: "machine",
      },

      subcategories: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Category",
  categorySchema
);