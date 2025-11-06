const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/item.controller");

router.get("/", verifyJWT, getItems);
router.post("/", verifyJWT, createItem);
router.put("/:id", verifyJWT, updateItem);
router.delete("/:id", verifyJWT, deleteItem);

module.exports = router;
