const express = require("express");
const authMiddleware = require("../auth/authMiddleware");
const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("./addressController");

const router = express.Router();

router.post("/", authMiddleware, addAddress);
router.get("/", authMiddleware, getAddresses);
router.put("/:id", authMiddleware, updateAddress);
router.delete("/:id", authMiddleware, deleteAddress);
router.patch("/:id/default", authMiddleware, setDefaultAddress);

module.exports = router;
