import mongoose from "mongoose";

const navbarSchema =
  new mongoose.Schema(
    {
      categories: [
        {
          type: String,
          trim: true,
        },
      ],

      placeholder: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
      },

      signInButton: {
        type: String,
        required: true,
        trim: true,
        default: "Sign In",
      },

      defaultCity: {
        type: String,
        required: true,
        trim: true,
        default: "Select City",
      },

      showMainCategory: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Navbar",
  navbarSchema
);