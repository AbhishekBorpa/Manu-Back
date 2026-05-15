import mongoose from "mongoose";

const statSchema =
  new mongoose.Schema(
    {
      icon: {
        type: String,
        required: true,
        trim: true,
      },

      value: {
        type: String,
        required: true,
        trim: true,
      },

      label: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 120,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Stat",
  statSchema
);