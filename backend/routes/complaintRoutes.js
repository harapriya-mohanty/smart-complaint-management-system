const express = require("express");
const router = express.Router();
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
  assignWorker,
  verifyCompletion,
} = require("../controllers/complaintController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.route("/").get(protect, getComplaints).post(protect, createComplaint);
router.route("/:id").get(protect, getComplaintById);
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);
router.put("/:id/assign", protect, adminOnly, assignWorker);
router.put("/:id/verify", protect, verifyCompletion);

module.exports = router;
