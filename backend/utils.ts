import mongoose from "mongoose";
import { ICourse, ISchedule } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isBoolean = (text: unknown): text is boolean => {
  return typeof text === "boolean" || text instanceof Boolean;
};

const parseBoolean = (text: unknown): boolean => {
  if (!isBoolean(text)) throw new Error("error parsing boolean from the body");
  return text;
};

export const parseString = (text: unknown): string => {
  if (!isString(text)) throw new Error("error parsing string from body");
  return text;
};

const parseDate = (date: unknown): Date => {
  if (!date || !isString(date)) throw new Error("error parsing date from body");
  return new Date(date);
};

const parseId = (id: unknown): mongoose.Types.ObjectId => {
  if (!id || !isString(id)) throw new Error("error parsing id from body");
  return new mongoose.Types.ObjectId(id);
};

const parseCourses = (courses: unknown): mongoose.Types.ObjectId[] => {
  if (!courses) return [];
  if (!Array.isArray(courses)) throw new Error("incorect courses array");
  return courses.map((x) => parseId(x));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCourse = (body: any): Omit<ICourse, "user"> => {
  const base = {
    title: parseString(body.title),
    start: parseDate(body.start),
    end: parseDate(body.end),
    allDay: parseBoolean(body.allDay),
  };
  if (body.info) return { ...base, info: parseString(body.info) };
  else return base;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSchedule = (body: any): Omit<ISchedule, "user"> => {
  const base = {
    name: parseString(body.name),
    courses: parseCourses(body.courses),
  };
  if (body.description)
    return { ...base, description: parseString(body.description) };
  else return base;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSchedules = (body: any): mongoose.Types.ObjectId[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const schedules = body.schedules;
  if (!schedules) throw new Error("schedules missing");
  if (!Array.isArray(schedules)) throw new Error("incorect schedules array");
  return schedules.map((x) => parseId(x));
};
