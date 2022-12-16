import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import "dotenv/config";

import { errorHandler } from "./middlewares";

import courseController from "./controllers/courseController";

const MONGO_URI =
  (process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI) || "";
console.log("connecting to ", MONGO_URI);

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to MONGODB"))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use("/api/courses", courseController);
app.use(errorHandler);

export default app;
