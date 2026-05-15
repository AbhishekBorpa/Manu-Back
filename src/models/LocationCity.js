import mongoose from "mongoose";

const locationCitySchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },

      state: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },

      img: {
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
  "LocationCity",
  locationCitySchema
);