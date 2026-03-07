const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in environment variables");
  }

  try {
    const dbName = process.env.MONGODB_DB_NAME || "jass_automotives";

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB connected successfully (db: ${dbName})`);
  } catch (error) {
    if (error.message?.includes("querySrv")) {
      console.error(
        "MongoDB DNS lookup failed for SRV record. Check DNS/firewall or use a non-SRV Atlas connection string.",
      );
    }
    throw error;
  }
};

module.exports = connectDB;
