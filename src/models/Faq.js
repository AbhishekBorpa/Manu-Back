import mongoose from "mongoose";

const faqSchema =
  new mongoose.Schema(
    {
      question: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5,
        maxlength: 300,
      },

      answer: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 2000,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Faq",
  faqSchema
);