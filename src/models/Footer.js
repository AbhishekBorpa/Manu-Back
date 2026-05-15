import mongoose from "mongoose";

const footerSchema =
  new mongoose.Schema(
    {
      about: {
        type: String,
        required: true,
        trim: true,
        minlength: 20,
        maxlength: 1000,
      },

      facebook: {
        type: String,
        trim: true,
        default: "",
      },

      instagram: {
        type: String,
        trim: true,
        default: "",
      },

      linkedin: {
        type: String,
        trim: true,
        default: "",
      },

      youtube: {
        type: String,
        trim: true,
        default: "",
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      timing: {
        type: String,
        required: true,
        trim: true,
      },

      /* 🔥 MANUFACTURING */

      manufacturingHeading: {
        type: String,
        required: true,
        trim: true,
      },

      manufacturingLinks: [
        {
          type: String,
          trim: true,
        },
      ],

      /* 🔥 PROJECTS */

      projectHeading: {
        type: String,
        required: true,
        trim: true,
      },

      projectLinks: [
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
  "Footer",
  footerSchema
);