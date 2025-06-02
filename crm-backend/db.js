import mongoose from "mongoose";
//This file is used to connect to the mongoDB database

const connectToDatabase = async () => {
  const pass = process.env.MONGODB_PASSWORD;
  const rawUrl = process.env.MONGODB_URL;

  if (!pass || !rawUrl) {
    throw new Error(
      "MONGODB_URL or MONGODB_PASSWORD not defined in env variables"
    );
  }

  const url = rawUrl.replace("<password>", pass);

  try {
    await mongoose.connect(url, {});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
};

export default connectToDatabase;
