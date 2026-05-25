const Complaint = require("../models/Complaint");

// @desc    Get assigned tasks for logged-in worker
// @route   GET /api/workers/tasks
const getAssignedTasks = async (req, res) => {
  try {
    const tasks = await Complaint.find({ assignedWorker: req.user._id })
      .populate("resident", "name email phone address")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task status with proof
// @route   PUT /api/workers/tasks/:id
const updateTaskStatus = async (req, res) => {
  try {
    const { status, notes, completionProof } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (complaint.assignedWorker.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Worker lifecycle:
    // - "in-progress" while working
    // - once completion proof is provided, always move to "awaiting-verification"
    //   (resident must accept/reject)
    if (notes) complaint.notes = notes;

    if (completionProof) {
      complaint.completionProof = completionProof;
      complaint.status = "awaiting-verification";
    } else if (status === "completed" || status === "awaiting-verification") {
      complaint.status = "awaiting-verification";
    } else if (status === "in-progress") {
      complaint.status = "in-progress";
    }

    const updated = await complaint.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get worker's work history (completed tasks)
// @route   GET /api/workers/history
const getWorkHistory = async (req, res) => {
  try {
    const history = await Complaint.find({
      assignedWorker: req.user._id,
      status: "completed",
      residentVerified: true,
    })
      .populate("resident", "name email")
      .sort({ updatedAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAssignedTasks, updateTaskStatus, getWorkHistory };
