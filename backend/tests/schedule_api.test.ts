/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Course from "../models/course";
import Schedule from "../models/schedule";
import { ICourse, ISchedule } from "../types";

const initialSchedules: ISchedule[] = [
  { name: "Aalto", courses: [] },
  { name: "Club activities", courses: [], description: "Caviar lovers club" },
];

const initialCourses: ICourse[] = [
  {
    name: "Saksa 1",
    startDate: new Date("2022-12-12"),
    endDate: new Date("2022-12-15"),
  },
  {
    name: "Saksa 8",
    startDate: new Date("2023-01-10"),
    endDate: new Date("2023-02-01"),
    info: "very hard course",
  },
];

const api = supertest(app);

jest.setTimeout(20000);

test("schedules are returned as json", async () => {
  await api
    .get("/api/schedules/all")
    .expect(200)
    .expect("Content-type", /application\/json/);
});

describe("working with initial 2 schedules", () => {
  beforeEach(async () => {
    await Course.deleteMany({});
    const first = new Course(initialCourses[0]);
    const saved1 = await first.save();
    const second = new Course(initialCourses[1]);
    const saved2 = await second.save();
    await Schedule.deleteMany({});
    const firstSchedule = new Schedule(initialSchedules[0]);
    firstSchedule.courses = [saved1._id, saved2._id];
    await firstSchedule.save();
    const secondSchedule = new Schedule(initialSchedules[1]);
    await secondSchedule.save();
  });

  test("there are 2 schedules saved", async () => {
    const res = await api.get("/api/schedules/all");
    expect(res.body).toHaveLength(2);
  });

  test("returning all schedules works good", async () => {
    const res = await api.get("/api/schedules/all");
    //const contents = res.body.map((x: { content: any }) => x.content);
    expect(res.body[0].name).toBe("Aalto");
  });

  test("get schedule by id works", async () => {
    const all = await api.get("/api/schedules/all");
    const id = all.body[0].id;
    const res = await api.get(`/api/schedules/${id}`);
    expect(res.body.name).toBe("Aalto");
  });

  test("wrong id does not work", async () => {
    await api.get("/api/schedules/123123123123123123").expect(400);
  });

  test("course list for schedule works", async () => {
    const all = await api.get("/api/schedules/all");
    const id = all.body[0].id;
    const result = await api.get(`/api/schedules/${id}/courses`);
    expect(result.body).toHaveLength(2);
  });

  describe("adding new schedule", () => {
    test("adding valid schedule", async () => {
      const scheduleInfo = {
        name: "O1",
        courses: [],
        description: "hard schedule",
      };
      await api.post("/api/schedules").send(scheduleInfo).expect(201);
      const res = await api.get("/api/schedules/all");
      expect(res.body).toHaveLength(3);
    });

    test("adding valid schedule with courses", async () => {
      const scheduleInfo = {
        name: "O1",
        courses: [],
        description: "hard schedule",
      };
      const course1 = {
        name: "Saksa 8",
        startDate: new Date("2023-01-10"),
        endDate: new Date("2023-02-01"),
        info: "very hard course",
      };
      const course1Mongo = new Course(course1);
      const courseRes = await course1Mongo.save();

      await api
        .post("/api/schedules")
        .send({ ...scheduleInfo, courses: [courseRes._id] })
        .expect(201);
      const res = await api.get("/api/schedules/all");
      expect(res.body).toHaveLength(3);
    });

    test("adding nonvalid schedule without name", async () => {
      const scheduleInfo = {
        //name: "O1",
        courses: [],
        description: "hard schedule",
      };
      await api.post("/api/schedules").send(scheduleInfo).expect(400);
    });

    test("adding nonvalid course without courses", async () => {
      const scheduleInfo = {
        name: "O1",
        //courses: [],
        description: "hard schedule",
      };
      await api.post("/api/schedules").send(scheduleInfo).expect(400);
    });

    test("adding valid course without description", async () => {
      const scheduleInfo = {
        name: "O1",
        courses: [],
      };
      await api.post("/api/schedules").send(scheduleInfo).expect(201);
      const res = await api.get("/api/schedules/all");
      expect(res.body).toHaveLength(3);
    });

    test("added schedule is really in database", async () => {
      const scheduleInfo = {
        name: "O1",
        courses: [],
        description: "hard schedule",
      };
      await api.post("/api/schedules").send(scheduleInfo).expect(201);
      const res = await api.get("/api/schedules/all");
      const id = res.body.find((x: { name: string }) => x.name === "O1").id;
      const findedRes = await api.get(`/api/schedules/${id}`);
      expect(findedRes.body.name).toBe("O1");
    });
  });
  describe("deleting", () => {
    test("deleting schedule with valid id", async () => {
      const scheduleToDelete = await Schedule.findOne({ name: "Aalto" });
      if (scheduleToDelete) {
        const id = scheduleToDelete._id;
        await api.delete(`/api/schedules/${id.toString()}`).expect(200);
      }
    });

    test("deleting with nonvalid id", async () => {
      await api.delete("/api/courses/123123123123123").expect(400);
    });
  });
  describe("changing", () => {
    test("changing valid schedule", async () => {
      const findedSchedule = await Schedule.findOne({ name: "Aalto" });
      if (findedSchedule) {
        const redacted = {
          name: findedSchedule.name + " 2022",
          courses: findedSchedule.courses,
        };
        const result = await api
          .put(`/api/schedules/${findedSchedule._id.toString()}`)
          .send(redacted);
        expect(result.status).toBe(200);
        expect(result.body.name).toBe("Aalto 2022");
      }
    });

    test("adding course to schedule", async () => {
      const findedSchedule = await Schedule.findOne({ name: "Aalto" });
      if (findedSchedule) {
        const course1 = {
          name: "Saksa 9",
          startDate: new Date("2023-01-10"),
          endDate: new Date("2023-02-01"),
          info: "very hard course",
        };
        const course1Mongo = new Course(course1);
        const courseRes = await course1Mongo.save();
        const redacted = {
          name: findedSchedule.name,
          courses: [...findedSchedule.courses, courseRes._id],
        };
        const result = await api
          .put(`/api/schedules/${findedSchedule._id.toString()}`)
          .send(redacted);
        expect(result.status).toBe(200);
        expect(result.body.courses[2].name).toBe("Saksa 9");
      }
    });

    test("changing nonvalid course", async () => {
      await api.put("/api/courses/13123123123123123123").expect(400);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
