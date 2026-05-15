import mongoose from "mongoose";

const testimonialSchema =
  new mongoose.Schema(
    {
      text: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 2000,
      },

      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 120,
      },

      location: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 120,
      },

      color: {
        type: String,
        trim: true,
        default: "green",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Testimonial",
  testimonialSchema
);