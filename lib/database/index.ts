import mongoose from "mongoose";

const URL = process.env.MONGODB_URL;
const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("already connected to db");
    return cached.conn;
  }
  if (!URL) {
    console.log("NO URL");
    throw new Error("NO MongodbURL Present");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(URL, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  console.log("connected to db");
  return cached.conn;
};
