const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI?.trim();
  const dbName = process.env.MONGO_DB_NAME || "smart-complaint-system";

  if (!uri) {
    console.error("MongoDB Error: Missing MONGO_URI in environment");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName,
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;