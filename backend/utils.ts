import { ICourse } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text))
    throw new Error("error parsing string from body");
  return text;
};

const parseDate = (date: unknown): Date => {
  if (!date || !isString(date)) throw new Error("error parsing date from body");
  return new Date(date);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCourse = (body: any): ICourse => {
  const base = {
    name: parseString(body.name),
    startDate: parseDate(body.startDate),
    endDate: parseDate(body.endDate),
  };
  if (body.info) return { ...base, info: parseString(body.info) };
  else return base;
};
