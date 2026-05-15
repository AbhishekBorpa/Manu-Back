import mongoose from "mongoose";

const citySchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 100,
      },

      image: {
        type: String,
        trim: true,
        default: "",
      },

      state: {
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
  "City",
  citySchema
);