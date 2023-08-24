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
import { setUpDB } from "./helper";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "SECRET";

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
    await setUpDB();
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
    let token = "";
    beforeEach(async () => {
      const result = await api
        .post("/api/login")
        .send({ username: "admin", password: "admin" });
      token = result.body.token;
    });
    test("adding valid schedule", async () => {
      const scheduleInfo = {
        name: "O1",
        courses: [],
        description: "hard schedule",
      };
      await api
        .post("/api/schedules")
        .set("Authorization", String("bearer " + token))
        .send(scheduleInfo)
        .expect(201);
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
        title: "Saksa 8",
        start: new Date("2023-01-10"),
        end: new Date("2023-02-01"),
        info: "very hard course",
        allDay: false,
      };
      const course1Mongo = new Course(course1);
      const courseRes = await course1Mongo.save();

      await api
        .post("/api/schedules")
        .set("Authorization", String("bearer " + token))
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
      await api
        .post("/api/schedules")
        .set("Authorization", String("bearer " + token))
        .send(scheduleInfo)
        .expect(400);
    });

    test("adding schedule without courses", async () => {
      const scheduleInfo = {
        name: "O1",
        //courses: [],
        description: "hard schedule",
      };
      await api
        .post("/api/schedules")
        .set("Authorization", String("bearer " + token))
        .send(scheduleInfo)
        .expect(201);
    });

    test("adding valid course without description", async () => {
      const scheduleInfo = {
        name: "O1",
        courses: [],
      };
      await api
        .post("/api/schedules")
        .set("Authorization", String("bearer " + token))
        .send(scheduleInfo)
        .expect(201);
      const res = await api.get("/api/schedules/all");
      expect(res.body).toHaveLength(3);
    });

    test("added schedule is really in database", async () => {
      const scheduleInfo = {
        name: "O1",
        courses: [],
        description: "hard schedule",
      };
      await api
        .post("/api/schedules")
        .set("Authorization", String("bearer " + token))
        .send(scheduleInfo)
        .expect(201);
      const res = await api.get("/api/schedules/all");
      const id = res.body.find((x: { name: string }) => x.name === "O1").id;
      const findedRes = await api.get(`/api/schedules/${id}`);
      expect(findedRes.body.name).toBe("O1");
    });

    test("adding course to schedule via put", async () => {
      const findedSchedule = await Schedule.findOne({ name: "Aalto" });
      if (findedSchedule) {
        const course1 = {
          title: "Saksa 9",
          start: new Date("2023-01-10"),
          end: new Date("2023-02-01"),
          info: "very hard course",
          allDay: false,
        };
        const course1Mongo = new Course(course1);
        const courseRes = await course1Mongo.save();
        const redacted = {
          name: findedSchedule.name,
          courses: [...findedSchedule.courses, courseRes._id],
        };
        const result = await api
          .put(`/api/schedules/${findedSchedule._id.toString()}`)
          .set("Authorization", String("bearer " + token))
          .send(redacted);
        expect(result.status).toBe(200);
        expect(result.body.courses[2].title).toBe("Saksa 9");
      }
    });

    test("adding course to schedule via post", async () => {
      const findedSchedule = await Schedule.findOne({ name: "Aalto" });
      if (findedSchedule) {
        const course1 = {
          title: "Saksa 9",
          start: new Date("2023-01-10"),
          end: new Date("2023-02-01"),
          info: "very hard course",
          allDay: false,
        };
        const result = await api
          .post(`/api/schedules/${findedSchedule._id.toString()}/addCourse`)
          .set("Authorization", String("bearer " + token))
          .send(course1)
          .expect(201);
        expect(result.body.courses).toHaveLength(3);
      }
    });

    test("can not add without authorization", async () => {
      const scheduleInfo = {
        name: "O1",
        courses: [],
        description: "hard schedule",
      };
      await api.post("/api/schedules").send(scheduleInfo).expect(401);
    });
  });

  describe("deleting", () => {
    let token = "";
    beforeEach(async () => {
      const result = await api
        .post("/api/login")
        .send({ username: "admin", password: "admin" });
      token = result.body.token;
    });
    test("deleting schedule with valid id", async () => {
      const scheduleToDelete = await Schedule.findOne({ name: "Aalto" });
      if (scheduleToDelete) {
        const id = scheduleToDelete._id;
        await api
          .delete(`/api/schedules/${id.toString()}`)
          .set("Authorization", String("bearer " + token))
          .expect(200);
      }
    });

    test("deleting with nonvalid id", async () => {
      await api
        .delete("/api/courses/123123123123123")
        .set("Authorization", String("bearer " + token))
        .expect(400);
    });

    test("can not delete other user's schedules", async () => {
      const scheduleToDelete = await Schedule.findOne({ name: "Aalto" });
      const unrealUser = { username: "aboba", id: "adad123jn1n4r8jrfiu2398" };
      token = jwt.sign(unrealUser, SECRET);
      if (scheduleToDelete) {
        const id = scheduleToDelete._id;
        await api
          .delete(`/api/schedules/${id.toString()}`)
          .set("Authorization", String("bearer " + token))
          .expect(405);
      }
    });
  });
  describe("changing", () => {
    let token = "";
    beforeEach(async () => {
      const result = await api
        .post("/api/login")
        .send({ username: "admin", password: "admin" });
      token = result.body.token;
    });
    test("changing valid schedule", async () => {
      const findedSchedule = await Schedule.findOne({ name: "Aalto" });
      if (findedSchedule) {
        const redacted = {
          name: findedSchedule.name + " 2022",
          courses: findedSchedule.courses,
        };
        const result = await api
          .put(`/api/schedules/${findedSchedule._id.toString()}`)
          .set("Authorization", String("bearer " + token))
          .send(redacted);
        expect(result.status).toBe(200);
        expect(result.body.name).toBe("Aalto 2022");
      }
    });

    test("changing nonvalid course", async () => {
      await api
        .put("/api/courses/13123123123123123123")
        .set("Authorization", String("bearer " + token))
        .expect(400);
    });

    test("can not change other user's schedules", async () => {
      const findedSchedule = await Schedule.findOne({ name: "Aalto" });
      if (findedSchedule) {
        const redacted = {
          name: findedSchedule.name + " 2022",
          courses: findedSchedule.courses,
        };
        const unrealUser = { username: "aboba", id: "adad123jn1n4r8jrfiu2398" };
        token = jwt.sign(unrealUser, SECRET);
        await api
          .put(`/api/schedules/${findedSchedule._id.toString()}`)
          .set("Authorization", String("bearer " + token))
          .send(redacted)
          .expect(405);
      }
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
