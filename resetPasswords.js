import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";

dotenv.config();

const resetPasswords = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const newPassword = await bcrypt.hash("123456", 10);
    
    const result = await User.updateMany({}, { $set: { password: newPassword } });
    
    console.log(`Successfully reset passwords for ${result.modifiedCount} users to: 123456`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetPasswords();
