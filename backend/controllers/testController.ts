import express, { RequestHandler } from "express";
import User from "../models/User";
import Schedule from "../models/schedule";
import Course from "../models/course";

const testController = express.Router();

testController.post("/test/resetDb", (async (_, res) => {
  await User.deleteMany({});
  await Schedule.deleteMany({});
  await Course.deleteMany({});
  res.status(200).end();
}) as RequestHandler);

export default testController;
