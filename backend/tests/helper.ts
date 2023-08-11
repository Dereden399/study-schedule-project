import { ICourse, ISchedule, IUser } from "../types";
import * as bcrypt from "bcrypt";
import Course from "../models/course";
import Schedule from "../models/schedule";
import User from "../models/User";

const initialUser = async (): Promise<IUser> => {
  const hash = await bcrypt.hash("admin", 10);
  return {
    username: "admin",
    passwordHash: hash,
    schedules: [],
  };
};

export const initialSchedules: Omit<ISchedule, "user">[] = [
  { name: "Aalto", courses: [] },
  { name: "Club activities", courses: [], description: "Caviar lovers club" },
];

export const initialCourses: Omit<ICourse, "user">[] = [
  {
    title: "Saksa 1",
    start: new Date("2022-12-12"),
    end: new Date("2022-12-15"),
    allDay: false,
  },
  {
    title: "Saksa 8",
    start: new Date("2023-01-10"),
    end: new Date("2023-02-01"),
    info: "very hard course",
    allDay: false,
  },
];

export const setUpDB = async () => {
  await User.deleteMany({});
  await Schedule.deleteMany({});
  await Course.deleteMany({});

  const toSaveUser = new User(await initialUser());
  const result = await toSaveUser.save();
  const first = new Course(initialCourses[0]);
  first.user = result._id;
  const saved1 = await first.save();
  const second = new Course(initialCourses[1]);
  second.user = result._id;
  const saved2 = await second.save();
  const firstSchedule = new Schedule(initialSchedules[0]);
  firstSchedule.courses = [saved1._id, saved2._id];
  firstSchedule.user = result._id;
  await firstSchedule.save();

  const secondSchedule = new Schedule(initialSchedules[1]);
  secondSchedule.courses = [saved1._id];
  secondSchedule.user = result._id;
  await secondSchedule.save();

  result.schedules = [firstSchedule._id, secondSchedule._id];
  await result.save();
};
