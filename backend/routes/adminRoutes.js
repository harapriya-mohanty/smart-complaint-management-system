const express = require("express");
const router = express.Router();
const {
  getAnalytics,
  getAllWorkers,
  getAllResidents,
  deleteUser,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/analytics", protect, adminOnly, getAnalytics);
router.get("/workers", protect, adminOnly, getAllWorkers);
router.get("/residents", protect, adminOnly, getAllResidents);
router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;
