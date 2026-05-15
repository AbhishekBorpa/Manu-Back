import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";

// 🔥 ENV
dotenv.config();

const app = express();

// 🔥 CONNECT DATABASE
connectDB();

// 🔥 MIDDLEWARES
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 STATIC FILES
app.use("/uploads", express.static("uploads"));

// 🔥 API ROUTES
app.use("/api", routes);

// 🔥 HOME ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "API Running 🚀",
  });
});

// 🔥 404 ROUTE
app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Route not found ❌",
  });
});

// 🔥 GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log("SERVER ERROR:", err.message);
  res.status(500).json({
    success: false,
    msg: "Internal Server Error ❌",
  });
});

export default app;
