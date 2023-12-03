import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connection", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (err) => {
      console.log("Failed to connect to MongoDB :: ", err);
      process.exit(1);
    });
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
