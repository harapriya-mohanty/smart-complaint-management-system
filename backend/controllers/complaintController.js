const Complaint = require("../models/Complaint");

// @desc    Create complaint
// @route   POST /api/complaints
const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority, imageUrl, location, suggestedSolution } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
      imageUrl,
      location,
      suggestedSolution,
      resident: req.user._id,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all complaints (admin) OR own complaints (resident)
// @route   GET /api/complaints
const getComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin") {
      complaints = await Complaint.find()
        .populate("resident", "name email")
        .populate("assignedWorker", "name email")
        .sort({ createdAt: -1 });
    } else if (req.user.role === "resident") {
      complaints = await Complaint.find({ resident: req.user._id })
        .populate("assignedWorker", "name email")
        .sort({ createdAt: -1 });
    } else if (req.user.role === "worker") {
      complaints = await Complaint.find({ assignedWorker: req.user._id })
        .populate("resident", "name email")
        .sort({ createdAt: -1 });
    }

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single complaint
// @route   GET /api/complaints/:id
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("resident", "name email phone")
      .populate("assignedWorker", "name email phone");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint status (worker/admin)
// @route   PUT /api/complaints/:id/status
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, notes, completionProof } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status || complaint.status;
    complaint.notes = notes || complaint.notes;
    complaint.completionProof = completionProof || complaint.completionProof;

    const updated = await complaint.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign worker to complaint (admin)
// @route   PUT /api/complaints/:id/assign
const assignWorker = async (req, res) => {
  try {
    const { workerId } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.assignedWorker = workerId;
    complaint.status = "assigned";

    const updated = await complaint.save();
    await updated.populate("assignedWorker", "name email");
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Resident verifies completion
// @route   PUT /api/complaints/:id/verify
  const verifyCompletion = async (req, res) => {
  try {
    const { action, notes } = req.body || {};
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.resident.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (complaint.status !== "awaiting-verification") {
      return res.status(400).json({ message: "Complaint is not awaiting verification" });
    }

    if (action === "reject") {
      complaint.residentVerified = false;
      complaint.verifiedAt = null;
      complaint.status = "rejected";
      if (notes) complaint.notes = notes;
    } else {
      complaint.residentVerified = true;
      complaint.verifiedAt = new Date();
      complaint.status = "completed";
      if (notes) complaint.notes = notes;
    }

    const updated = await complaint.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
  assignWorker,
  verifyCompletion,
};
