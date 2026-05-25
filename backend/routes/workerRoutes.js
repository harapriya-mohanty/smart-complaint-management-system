const express = require("express");
const router = express.Router();
const {
  getAssignedTasks,
  updateTaskStatus,
  getWorkHistory,
} = require("../controllers/workerController");
const { protect, workerOnly } = require("../middleware/authMiddleware");

router.get("/tasks", protect, workerOnly, getAssignedTasks);
router.put("/tasks/:id", protect, workerOnly, updateTaskStatus);
router.get("/history", protect, workerOnly, getWorkHistory);

module.exports = router;
