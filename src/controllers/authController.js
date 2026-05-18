import User from "../models/User.js";
import Order from "../models/Order.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* 🔥 GENERATE TOKEN */
const generateToken = (id, role) => {

  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};




/* 🔥 REGISTER */
export const registerUser = async (
  req,
  res
) => {

  try {

    let {
      name,
      email,
      phone,
      password,
    } = req.body;



    /* 🔥 REQUIRED CHECK */
    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "All required fields missing ❌",
      });
    }



    /* 🔥 CLEAN DATA */
    name = name.trim();

    email = email
      .toLowerCase()
      .trim();

    password =
      password.trim();

    if (phone) {

      phone = phone.trim();
    }



    /* 🔥 EMAIL VALIDATION */
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "Invalid email format ❌",
      });
    }



    /* 🔥 PHONE VALIDATION */
    if (
      phone &&
      !/^[0-9]{10}$/.test(phone)
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "Phone number must be 10 digits ❌",
      });
    }



    /* 🔥 PASSWORD VALIDATION */
    if (
      password.length < 6
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "Password must be at least 6 characters ❌",
      });
    }



    /* 🔥 STRONG PASSWORD */
    const strongPassword =
      /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (
      !strongPassword.test(
        password
      )
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "Password must contain letters & numbers ❌",
      });
    }



    /* 🔥 USER EXISTS */
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        msg:
          "User already exists ❌",
      });
    }



    /* 🔥 HASH PASSWORD */
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );



    /* 🔥 CREATE USER */
    const newUser =
      await User.create({
        name,
        email,
        phone,
        password:
          hashedPassword,
      });



    /* 🔥 TOKEN */
    const token =
      generateToken(
        newUser._id,
        newUser.role
      );



    res.status(201).json({
      success: true,

      msg:
        "User registered successfully ✅",

      token,

      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  }catch (err) {

  console.log(
    "FULL REGISTER ERROR =>",
    err
  );

  return res.status(500).json({
    success: false,
    msg: err.message,
  });
}
};




/* 🔥 LOGIN */
export const loginUser = async (
  req,
  res
) => {

  try {

    let {
      email,
      password,
    } = req.body;



    /* 🔥 REQUIRED */
    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "Email & password required ❌",
      });
    }



    email = email
      .toLowerCase()
      .trim();

    password =
      password.trim();



    /* 🔥 FIND USER */
    const user =
      await User.findOne({
        email,
      }).select("+password");



    if (!user) {

      return res.status(400).json({
        success: false,
        msg:
          "Invalid email ❌",
      });
    }



    /* 🔥 CHECK PASSWORD */
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );



    if (!isMatch) {

      return res.status(400).json({
        success: false,
        msg:
          "Invalid password ❌",
      });
    }



    /* 🔥 TOKEN */
    const token =
      generateToken(
        user._id,
        user.role
      );



    res.status(200).json({
      success: true,

      msg:
        "Login successful ✅",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {

    console.log(
      "LOGIN ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg:
        "Server error ❌",
    });
  }
};




/* 🔥 GET PROFILE */
export const getProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      ).select("-password");



    if (!user) {

      return res.status(404).json({
        success: false,
        msg:
          "User not found ❌",
      });
    }



    res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {

    console.log(
      "PROFILE ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg:
        "Server error ❌",
    });
  }
};

/* 🔥 UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  try {
    let { name, phone } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        msg: "Name is required ❌",
      });
    }

    name = name.trim();
    if (phone) {
      phone = phone.trim();
      if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({
          success: false,
          msg: "Phone number must be 10 digits ❌",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Profile updated successfully ✅",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    console.log("UPDATE PROFILE ERROR =>", err);
    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};

/* 🔥 CHANGE PASSWORD */
export const changePassword = async (req, res) => {
  try {
    let { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        msg: "Current and new passwords are required ❌",
      });
    }

    currentPassword = currentPassword.trim();
    newPassword = newPassword.trim();

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        msg: "Password must be at least 6 characters ❌",
      });
    }

    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!strongPassword.test(newPassword)) {
      return res.status(400).json({
        success: false,
        msg: "Password must contain letters & numbers ❌",
      });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found ❌",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: "Invalid current password ❌",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      msg: "Password updated successfully ✅",
    });
  } catch (err) {
    console.log("CHANGE PASSWORD ERROR =>", err);
    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};

/* 🔥 GET USER ORDERS */
export const getUserOrders = async (req, res) => {
  try {
    const email = req.user.email.toLowerCase().trim();
    const orders = await Order.find({
      "customer.email": new RegExp("^" + email + "$", "i"),
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.log("GET USER ORDERS ERROR =>", err);
    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};