// inventory-backend/routes/inventoryRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/inventoryController");

// Route: GET /api/items
router.get("/", auth, controller.getAllItems);

// Route: POST /api/items
router.post("/", auth, controller.createItem);

// Route: PUT /api/items/:id
router.put("/:id", auth, controller.updateItem);

// Route: DELETE /api/items/:id
router.delete("/:id", auth, controller.deleteItem);

module.exports = router;
