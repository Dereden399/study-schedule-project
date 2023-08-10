import express, { RequestHandler } from "express";
import mongoose from "mongoose";
import { AuthentificationCheck } from "../middlewares";
import Course from "../models/course";
import Schedule from "../models/schedule";
import { parseCourse, parseSchedule } from "../utils";
import User from "../models/User";

const scheduleController = express.Router();

scheduleController.get("/all", (async (_req, res) => {
  const allSchedules = await Schedule.find({}).populate("courses", {
    name: 1,
    startDate: 1,
    endDate: 1,
    info: 1,
  });
  res.status(200).json(allSchedules.map((x) => x.toJSON()));
}) as RequestHandler);

scheduleController.get("/:id", (async (req, res) => {
  const finded = await Schedule.findById(req.params.id).populate("courses", {
    name: 1,
    startDate: 1,
    endDate: 1,
    info: 1,
  });
  if (finded) {
    res.status(200).json(finded.toJSON());
  } else {
    res.status(404).end();
  }
}) as RequestHandler);

scheduleController.get("/:id/courses", (async (req, res) => {
  const finded = await Schedule.findById(req.params.id).populate("courses", {
    name: 1,
    startDate: 1,
    endDate: 1,
    info: 1,
  });
  if (finded) {
    res.status(200).json(finded.courses);
  } else {
    res.status(404).end();
  }
}) as RequestHandler);

scheduleController.post("/", AuthentificationCheck, (async (req, res) => {
  const scheduleFromBody = parseSchedule(req.body);
  const toPost = new Schedule({ ...scheduleFromBody, user: req.currentUserId });
  const result = await toPost.save();
  const user = await User.findById(req.currentUserId);
  if (!user)
    throw new Error("Something went wrong with adding a schedule to user");
  user.schedules.push(result._id);
  await user.save();
  res.status(201).json(result.toJSON());
}) as RequestHandler);

scheduleController.post("/:id/addCourse", AuthentificationCheck, (async (
  req,
  res
) => {
  const finded = await Schedule.findById(req.params.id);
  if (finded) {
    const courseFromBody = parseCourse(req.body);
    const courseToSave = new Course({
      ...courseFromBody,
      user: new mongoose.Types.ObjectId(req.currentUserId),
    });
    await courseToSave.save();
    finded.courses = [...finded.courses, courseToSave._id];
    const result = await (
      await finded.save()
    ).populate("courses", {
      name: 1,
      startDate: 1,
      endDate: 1,
      info: 1,
    });
    res.status(201).json(result.toJSON());
  } else {
    res.status(404).end();
  }
}) as RequestHandler);

scheduleController.delete("/:id", AuthentificationCheck, (async (req, res) => {
  const finded = await Schedule.findById(req.params.id);
  if (finded) {
    if (finded.user.toString() !== req.currentUserId)
      res.status(405).json({ error: "can not delete other user's schedules" });
    else {
      await finded.delete();
      res.status(200).end();
    }
  } else res.status(404).end();
}) as RequestHandler);

scheduleController.put("/:id", AuthentificationCheck, (async (req, res) => {
  const finded = await Schedule.findById(req.params.id);
  if (finded) {
    if (finded.user.toString() !== req.currentUserId) {
      res.status(405).json({ error: "can not modify other user's schedules" });
      return;
    } else {
      const parsedBody = parseSchedule(req.body);
      finded.name = parsedBody.name;
      finded.courses = parsedBody.courses;
      if (parsedBody.description) finded.description = parsedBody.description;
      const result = await (
        await finded.save()
      ).populate("courses", {
        name: 1,
        startDate: 1,
        endDate: 1,
        info: 1,
      });
      res.status(200).json(result.toJSON());
    }
  } else {
    res.status(404).end();
  }
}) as RequestHandler);

export default scheduleController;
