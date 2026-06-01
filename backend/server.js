import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import contactRouter from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000,http://127.0.0.1:5500,http://localhost:5500")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Bhavya Shukla Portfolio API",
    status: "running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? "connected" : "fallback-json",
  });
});

app.use("/api/contact", contactRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.info("MONGODB_URI not set. Contact messages will use backend/data/contacts.json.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME || undefined,
    });
    console.info("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed. Falling back to local JSON storage.", error.message);
  }
}

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.info(`Portfolio API running on http://localhost:${PORT}`);
  });
}

startServer();
