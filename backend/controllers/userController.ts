import express, { RequestHandler } from "express";
import User from "../models/User";
import { ISchedule } from "../types";
import * as bcrypt from "bcrypt";
import { parseSchedules, parseString } from "../utils";
import { AuthentificationCheck } from "../middlewares";

const userController = express.Router();

userController.post("/", (async (req, res) => {
  const username = parseString(req.body.username);
  const password = parseString(req.body.password);
  if (username.length < 5 || password.length < 5)
    res
      .status(400)
      .json({ error: "username and password must be at least 5 letters long" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username: username,
    passwordHash: passwordHash,
    schedules: [],
  });
  const saved = await user.save();
  res.status(201).json(saved.toJSON());
}) as RequestHandler);

userController.get("/all", (async (_req, res) => {
  const users = await User.find({}).populate(
    "schedules",
    "name description courses"
  );
  res.status(200).json(users.map((x) => x.toJSON()));
}) as RequestHandler);

userController.get("/:id", (async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    "schedules",
    "name description courses"
  );
  if (user) {
    res.status(200).json(user.toJSON());
  } else res.status(404).end();
}) as RequestHandler);

userController.get("/:id/schedules", (async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "schedules",
    select: "name description courses",
    populate: { path: "courses", select: "name startDate endDate info" },
  });
  if (user) {
    res.status(200).json(user.schedules.map((x) => x.toJSON()));
  } else res.status(404).end();
}) as RequestHandler);

userController.get("/:id/courses", (async (req, res) => {
  const user = await User.findById(req.params.id).populate<{
    schedules: ISchedule[];
  }>({ path: "schedules", populate: { path: "courses" } });
  if (user) {
    const coursesWithDublicates = user.schedules.flatMap((x) => x.courses);
    const coursesWithoutDublicates = [...new Set(coursesWithDublicates)];
    res.status(200).json(coursesWithoutDublicates.map((x) => x.toJSON()));
  } else res.status(404).end();
}) as RequestHandler);

userController.put("/:id", AuthentificationCheck, (async (req, res) => {
  const newSchedules = parseSchedules(req.body);
  const user = await User.findById(req.params.id);
  if (user) {
    if (user._id.toString() !== req.currentUserId)
      res.status(405).json({ error: "can not modify other user's account" });
    else {
      user.schedules = newSchedules;
      const result = await user.save();
      res.status(200).json(result.toJSON());
    }
  } else res.status(404).end();
}) as RequestHandler);

export default userController;
