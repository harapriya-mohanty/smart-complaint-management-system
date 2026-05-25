const User = require("../models/User");
const Complaint = require("../models/Complaint");

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
const getAnalytics = async (req, res) => {
  try {
    const { period } = req.query;
    let filter = {};
    const now = new Date();

    if (period === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filter = { createdAt: { $gte: startOfMonth, $lte: now } };
    } else if (period === "year") {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      filter = { createdAt: { $gte: startOfYear, $lte: now } };
    }

    const [totalComplaints, pending, inProgress, awaitingVerification, completed, assigned, rejected, totalWorkers, totalResidents] = await Promise.all([
      Complaint.countDocuments(filter),
      Complaint.countDocuments({ ...filter, status: "pending" }),
      Complaint.countDocuments({ ...filter, status: "in-progress" }),
      Complaint.countDocuments({ ...filter, status: "awaiting-verification" }),
      Complaint.countDocuments({ ...filter, status: "completed" }),
      Complaint.countDocuments({ ...filter, status: "assigned" }),
      Complaint.countDocuments({ ...filter, status: "rejected" }),
      User.countDocuments({ role: "worker" }),
      User.countDocuments({ role: "resident" }),
    ]);

    const inProcessCount = assigned + inProgress + awaitingVerification;

    res.json({
      totalComplaints,
      pending,
      inProgress,
      awaitingVerification,
      completed,
      assigned,
      rejected,
      inProcess: inProcessCount,
      totalWorkers,
      totalResidents,
      period: period || "all",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all workers with task counts
// @route   GET /api/admin/workers
const getAllWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: "worker" }).select("-password").lean();

    const workerTaskStats = await Complaint.aggregate([
      { $match: { assignedWorker: { $ne: null } } },
      {
        $group: {
          _id: "$assignedWorker",
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
          assigned: { $sum: { $cond: [{ $eq: ["$status", "assigned"] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] } },
          awaitingVerification: { $sum: { $cond: [{ $eq: ["$status", "awaiting-verification"] }, 1, 0] } },
          completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] } },
        },
      },
    ]);

    const taskStatsByWorker = workerTaskStats.reduce((acc, item) => {
      acc[item._id.toString()] = item;
      return acc;
    }, {});

    const enrichedWorkers = workers.map((worker) => {
      const counts = taskStatsByWorker[worker._id.toString()] || {
        total: 0,
        pending: 0,
        assigned: 0,
        inProgress: 0,
        awaitingVerification: 0,
        completed: 0,
        rejected: 0,
      };
      return {
        ...worker,
        taskCounts: counts,
      };
    });

    res.json(enrichedWorkers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all residents
// @route   GET /api/admin/residents
const getAllResidents = async (req, res) => {
  try {
    const residents = await User.find({ role: "resident" }).select("-password");
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAnalytics, getAllWorkers, getAllResidents, deleteUser };
