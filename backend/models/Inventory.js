// inventory-backend/models/Inventory.js
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  minLevel: {
    type: Number,
    default: 5,
  },
}, { timestamps: true });

module.exports = mongoose.model("Inventory", inventorySchema);
