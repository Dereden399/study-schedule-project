import express, { RequestHandler } from "express";
import Schedule from "../models/schedule";
import { parseSchedule } from "../utils";

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

scheduleController.post("/", (async (req, res) => {
  const scheduleFromBody = parseSchedule(req.body);
  const toPost = new Schedule(scheduleFromBody);
  const result = await toPost.save();
  res.status(201).json(result.toJSON());
}) as RequestHandler);

scheduleController.delete("/:id", (async (req, res) => {
  const finded = await Schedule.findById(req.params.id);
  if (finded) {
    await finded.delete();
    res.status(200).end();
  } else res.status(404).end();
}) as RequestHandler);

scheduleController.put("/:id", (async (req, res) => {
  const finded = await Schedule.findById(req.params.id);
  if (finded) {
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
  } else {
    res.status(404).end();
  }
}) as RequestHandler);

export default scheduleController;
