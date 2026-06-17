import mongoose from "mongoose";
import { Environment } from "./environment.js";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB connected ✅");
    return;
  }

  try {
    await mongoose.connect(Environment.MongoUri);

    console.log("MongoDB connected ✅");
  } catch (err) {
    if (!Environment.isProduction)
      console.error("MongoDB connection failed ❌", err);

    process.exit(1);
  }
};
