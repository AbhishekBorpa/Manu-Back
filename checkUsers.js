import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}, { password: 0 }); // Exclude password
    console.log("Existing Users in DB:");
    console.table(users.map(u => ({
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status
    })));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkUsers();
