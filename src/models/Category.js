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
        default: "https://via.placeholder.com/150",
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