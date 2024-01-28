import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) throw new Error("No Mongodb URI");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  try {
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB");
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
