import mongoose from "mongoose";
import { envs } from "./EnvConfig";

export default async () => {
  if (!envs.MONGO_URI) return;
  try {
    await mongoose.connect(envs.MONGO_URI);
  } catch (err) {
    console.log(`failed to connect to Mongo DB`);
    throw err;
  }
};

mongoose.connection.on("connected", () => {
  console.log(`MongoDB connected`);
});
mongoose.connection.on("disconnected", () => {
  console.log(`MongoDB disconnected`);
});
