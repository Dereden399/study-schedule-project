import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import "dotenv/config";

import { errorHandler } from "./middlewares";

import courseController from "./controllers/courseController";

const PORT = 3001;

const MONGO_URI = process.env.MONGODB_URI || "";
console.log("connecting to ", MONGO_URI);

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to MONGODB"))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use("/api/courses", courseController);

app.get("/ping", (_req, res) => {
  console.log("pinged");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}.`);
});
