import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 120,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        trim: true,
        default: "",
      },

      password: {
        type: String,
        required: true,
        minlength: 6,
        select: true,
      },

      /* 🔥 ROLE */
      role: {
        type: String,
        enum: [
          "user",
          "partner",
          "admin",
        ],
        default: "user",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "User",
  userSchema
);