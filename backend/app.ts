import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import "dotenv/config";

import { errorHandler, tokenExtractor } from "./middlewares";

import courseController from "./controllers/courseController";
import scheduleController from "./controllers/scheduleController";
import userController from "./controllers/userController";
import loginController from "./controllers/loginController";
import testController from "./controllers/testController";

const MONGO_URI =
  (process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI) || "";
console.log("connecting to ", MONGO_URI);

mongoose.set("strictQuery", true);
mongoose.set("strictPopulate", false);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to MONGODB"))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(tokenExtractor);
app.use("/courses", courseController);
app.use("/schedules", scheduleController);
app.use("/users", userController);
app.use("/login", loginController);

if (process.env.NODE_ENV === "test") {
  app.use("/", testController);
}

app.use(errorHandler);

export default app;
