import express, { RequestHandler } from "express";
import User from "../models/User";
import { ISchedule } from "../types";

const userController = express.Router();

userController.get("/all", (async (_req, res) => {
  const users = await User.find({}).populate("schedules");
  res.status(200).json(users.map((x) => x.toJSON()));
}) as RequestHandler);

userController.get("/:id", (async (req, res) => {
  const user = await User.findById(req.params.id).populate("schedules");
  if (user) {
    res.status(200).json(user.toJSON());
  } else res.status(404).end();
}) as RequestHandler);

userController.get("/:id/schedules", (async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("schedules")
    .populate("courses");
  if (user) {
    res.status(200).json(user.schedules.map((x) => x.toJSON()));
  } else res.status(404).end();
}) as RequestHandler);

userController.get("/:id/courses", (async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate<{ schedules: ISchedule[] }>("schedules")
    .populate("courses");
  if (user) {
    const coursesWithDublicates = user.schedules.flatMap((x) => x.courses);
    const coursesWithoutDublicates = [...new Set(coursesWithDublicates)];
    res.status(200).json(coursesWithoutDublicates.map((x) => x.toJSON()));
  } else res.status(404).end();
}) as RequestHandler);

export default userController;
