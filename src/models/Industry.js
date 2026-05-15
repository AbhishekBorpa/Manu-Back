import mongoose from "mongoose";

const industrySchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 120,
      },

      desc: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000,
      },

      icon: {
        type: String,
        required: true,
        trim: true,
      },

      color: {
        type: String,
        trim: true,
        default: "",
      },

      number: {
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
  "Industry",
  industrySchema
);