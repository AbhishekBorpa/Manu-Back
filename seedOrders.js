import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "./src/models/Order.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedOrders = async () => {
  await connectDB();

  try {
    const orders = [
      {
        orderId: "ORD-9931",
        customer: {
          name: "Acme Corp",
          email: "procurement@acme.com"
        },
        products: [], // Mocking without specific product IDs for simplicity
        totalAmount: 1250000,
        status: "Delivered",
        paymentStatus: "Paid"
      },
      {
        orderId: "ORD-9932",
        customer: {
          name: "TechVision Solutions",
          email: "billing@techvision.com"
        },
        products: [],
        totalAmount: 450000,
        status: "Processing",
        paymentStatus: "Paid"
      },
      {
        orderId: "ORD-9933",
        customer: {
          name: "Global Industries",
          email: "finance@globalind.com"
        },
        products: [],
        totalAmount: 8500000,
        status: "Shipped",
        paymentStatus: "Paid"
      },
      {
        orderId: "ORD-9934",
        customer: {
          name: "Startup Auto",
          email: "accounts@startupauto.in"
        },
        products: [],
        totalAmount: 250000,
        status: "Pending",
        paymentStatus: "Unpaid"
      },
      {
        orderId: "ORD-9935",
        customer: {
          name: "NextGen Robotics",
          email: "orders@nextgenrobo.com"
        },
        products: [],
        totalAmount: 3200000,
        status: "Delivered",
        paymentStatus: "Paid"
      }
    ];

    await Order.deleteMany(); // Clear existing
    await Order.insertMany(orders);
    console.log("Orders seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding orders:", error);
    process.exit(1);
  }
};

seedOrders();
