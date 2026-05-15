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

      icon: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Category",
  categorySchema
);