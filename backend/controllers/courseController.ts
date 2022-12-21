import express, { RequestHandler } from "express";
import mongoose from "mongoose";
import { AuthentificationCheck } from "../middlewares";
import Course from "../models/course";
import { ICourse } from "../types";
import { parseCourse } from "../utils";

const courseController = express.Router();

courseController.get("/all", (async (_req, res) => {
  const courses = await Course.find({});
  res.status(200).json(courses.map((x) => x.toJSON()));
}) as RequestHandler);

courseController.get("/:id", (async (req, res) => {
  const id = req.params.id;
  const findedCourse = await Course.findById(id);
  if (findedCourse) res.status(200).json(findedCourse.toJSON());
  else res.status(404).end();
}) as RequestHandler);

courseController.post("/", AuthentificationCheck, (async (req, res) => {
  const courseInfo: ICourse = {
    ...parseCourse(req.body),
    user: new mongoose.Types.ObjectId(req.currentUserId),
  };
  const course = new Course(courseInfo);
  const result = await course.save();
  res.status(201).json(result.toJSON());
}) as RequestHandler);

courseController.delete("/:id", AuthentificationCheck, (async (req, res) => {
  const id = req.params.id;
  const findedCourse = await Course.findById(id);
  if (findedCourse) {
    if (findedCourse.user.toString() !== req.currentUserId) {
      res.status(405).json({ error: "can not delete other user's courses" });
    } else {
      await findedCourse.delete();
      res.status(200).end();
    }
  } else res.status(404).end();
}) as RequestHandler);

courseController.put("/:id", AuthentificationCheck, (async (req, res) => {
  const id = req.params.id;
  const findedCourse = await Course.findById(id);
  if (findedCourse) {
    if (findedCourse.user.toString() !== req.currentUserId) {
      res.status(405).json({ error: "can not modify other user's courses" });
    } else {
      const parsedBodyCourse = parseCourse(req.body);
      findedCourse.name = parsedBodyCourse.name;
      findedCourse.startDate = parsedBodyCourse.startDate;
      findedCourse.endDate = parsedBodyCourse.endDate;
      if (parsedBodyCourse.info) findedCourse.info = parsedBodyCourse.info;
      const updatedBlog = await findedCourse.save();
      res.status(200).json(updatedBlog.toJSON());
    }
  } else res.status(404).end();
}) as RequestHandler);

export default courseController;
