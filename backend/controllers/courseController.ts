import express, { RequestHandler } from "express";
import Course from "../models/course";
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

courseController.post("/", (async (req, res) => {
  const courseInfo = parseCourse(req.body);
  const course = new Course(courseInfo);
  const result = await course.save();
  res.status(201).json(result.toJSON());
}) as RequestHandler);

courseController.delete("/:id", (async (req, res) => {
  const id = req.params.id;
  const findedCourse = await Course.findById(id);
  if (findedCourse) {
    await findedCourse.delete();
    res.status(200).end();
  } else res.status(404).end();
}) as RequestHandler);

courseController.put("/:id", (async (req, res) => {
  const id = req.params.id;
  const findedCourse = await Course.findById(id);
  if (findedCourse) {
    const parsedBodyCourse = parseCourse(req.body);
    findedCourse.name = parsedBodyCourse.name;
    findedCourse.startDate = parsedBodyCourse.startDate;
    findedCourse.endDate = parsedBodyCourse.endDate;
    if (parsedBodyCourse.info) findedCourse.info = parsedBodyCourse.info;
    const updatedBlog = await findedCourse.save();
    res.status(200).json(updatedBlog.toJSON());
  } else res.status(404).end();
}) as RequestHandler);

export default courseController;
