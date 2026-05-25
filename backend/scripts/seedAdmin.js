const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/User");

dotenv.config();

const email = (process.env.SEED_ADMIN_EMAIL || process.argv[2] || "").toLowerCase().trim();
const password = process.env.SEED_ADMIN_PASSWORD || process.argv[3] || "";
const name = process.env.SEED_ADMIN_NAME || process.argv[4] || "Admin";

if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET in .env");
  process.exit(1);
}

if (!email || !password) {
  console.error("Usage: npm run seed:admin -- <email> <password> [name]");
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email });
    if (existing) {
      if (existing.role !== "admin") {
        existing.role = "admin";
        await existing.save();
        console.log(`Updated existing user to admin: ${email}`);
      } else {
        console.log(`Admin already exists: ${email}`);
      }
      process.exit(0);
    }

    await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    console.log(`Created admin: ${email}`);
    process.exit(0);
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
};

run();

