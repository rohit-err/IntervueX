const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is missing in environment variables");
    }
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDb };
