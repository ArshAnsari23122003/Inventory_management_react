// inventory-backend/index.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/authRoutes")); // POST /api/login
app.use("/api/items", require("./routes/inventoryRoutes")); // CRUD /api/items

// Default route (optional)
app.get("/", (req, res) => {
  res.send("🎉 Inventory Management Backend is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
