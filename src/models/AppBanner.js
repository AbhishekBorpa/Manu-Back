import mongoose from "mongoose";

const appBannerSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 120,
      },

      description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000,
      },

      image: {
        type: String,
        required: true,
        trim: true,
      },

      playStoreLink: {
        type: String,
        trim: true,
        default: "",
      },

      appStoreLink: {
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
  "AppBanner",
  appBannerSchema
);