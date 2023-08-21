/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Course from "../models/course";
import { setUpDB } from "./helper";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "SECRET";

const api = supertest(app);

jest.setTimeout(20000);

test("courses are returned as json", async () => {
  await api
    .get("/api/courses/all")
    .expect(200)
    .expect("Content-type", /application\/json/);
});

describe("working with initial 2 courses", () => {
  beforeEach(async () => {
    await setUpDB();
  });

  test("there are 2 courses saved", async () => {
    const res = await api.get("/api/courses/all");
    expect(res.body).toHaveLength(2);
  });

  test("returning all courses works good", async () => {
    const res = await api.get("/api/courses/all");
    //const contents = res.body.map((x: { content: any }) => x.content);
    expect(res.body[0].title).toBe("Saksa 1");
  });

  test("get course by id works", async () => {
    const all = await api.get("/api/courses/all");
    const id = all.body[0].id;
    const res = await api.get(`/api/courses/${id}`);
    expect(res.body.title).toBe("Saksa 1");
  });

  test("wrong id does not work", async () => {
    await api.get("/api/courses/123123123123123123").expect(400);
  });

  describe("adding new course", () => {
    let token = "";
    beforeEach(async () => {
      const result = await api
        .post("/api/login")
        .send({ username: "admin", password: "admin" });
      token = result.body.token;
    });
    test("adding valid course", async () => {
      const courseInfo = {
        title: "O1",
        start: "2022-12-12",
        end: "2022-12-22",
        info: "some info",
        allDay: false,
      };
      await api
        .post("/api/courses")
        .set("Authorization", String("bearer " + token))
        .send(courseInfo)
        .expect(201);
      const res = await api.get("/api/courses/all");
      expect(res.body).toHaveLength(3);
    });

    test("adding nonvalid course without name", async () => {
      const courseInfo = {
        start: "2022-12-12",
        end: "2022-12-22",
        info: "some info",
        allDay: false,
      };
      await api
        .post("/api/courses")
        .set("Authorization", String("bearer " + token))
        .send(courseInfo)
        .expect(400);
    });

    test("adding nonvalid course without start date", async () => {
      const courseInfo = {
        title: "O1",
        end: "2022-12-22",
        info: "some info",
        allDay: false,
      };
      await api
        .post("/api/courses")
        .set("Authorization", String("bearer " + token))
        .send(courseInfo)
        .expect(400);
    });

    test("adding nonvalid course without end date", async () => {
      const courseInfo = {
        start: "2022-12-12",
        title: "O1",
        info: "some info",
        allDay: false,
      };
      await api
        .post("/api/courses")
        .set("Authorization", String("bearer " + token))
        .send(courseInfo)
        .expect(400);
    });

    test("adding valid course without info", async () => {
      const courseInfo = {
        title: "O1",
        start: "2022-12-12",
        end: "2022-12-22",
        allDay: false,
      };
      await api
        .post("/api/courses")
        .set("Authorization", String("bearer " + token))
        .send(courseInfo)
        .expect(201);
      const res = await api.get("/api/courses/all");
      expect(res.body).toHaveLength(3);
    });

    test("added course is really in database", async () => {
      const courseInfo = {
        title: "O1",
        start: "2022-12-12",
        end: "2022-12-22",
        info: "some info",
        allDay: false,
      };
      await api
        .post("/api/courses")
        .set("Authorization", String("bearer " + token))
        .send(courseInfo)
        .expect(201);
      const res = await api.get("/api/courses/all");
      const id = res.body.find((x: { title: string }) => x.title === "O1").id;
      const findedRes = await api.get(`/api/courses/${id}`);
      expect(findedRes.body.title).toBe("O1");
    });

    test("can not add without authorization", async () => {
      const courseInfo = {
        title: "O1",
        start: "2022-12-12",
        end: "2022-12-22",
        info: "some info",
        allDay: false,
      };
      await api.post("/api/courses").send(courseInfo).expect(401);
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
    test("deleting course with valid id", async () => {
      const courseToDelete = await Course.findOne({ title: "Saksa 1" });
      if (courseToDelete) {
        const id = courseToDelete._id;
        await api
          .delete(`/api/courses/${id.toString()}`)
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

    test("can not delete other user's courses", async () => {
      const courseToDelete = await Course.findOne({ title: "Saksa 1" });
      const unrealUser = { username: "aboba", id: "adad123jn1n4r8jrfiu2398" };
      token = jwt.sign(unrealUser, SECRET);
      if (courseToDelete) {
        const id = courseToDelete._id;
        await api
          .delete(`/api/courses/${id.toString()}`)
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
    test("changing valid course", async () => {
      const findedCourse = await Course.findOne({ title: "Saksa 1" });
      if (findedCourse) {
        const redacted = {
          title: findedCourse.title + " very good course for beginners",
          start: findedCourse.start.toString(),
          end: findedCourse.end.toString(),
          allDay: findedCourse.allDay,
        };
        const result = await api
          .put(`/api/courses/${findedCourse._id.toString()}`)
          .set("Authorization", String("bearer " + token))
          .send(redacted);
        expect(result.status).toBe(200);
        expect(result.body.title).toBe(
          "Saksa 1 very good course for beginners"
        );
      }
    });

    test("changing nonvalid course", async () => {
      await api
        .put("/api/courses/13123123123123123123")
        .set("Authorization", String("bearer " + token))
        .expect(400);
    });

    test("can not change other user's course", async () => {
      const findedCourse = await Course.findOne({ name: "Saksa 1" });
      if (findedCourse) {
        const redacted = {
          title: findedCourse.title + " very good course for beginners",
          start: findedCourse.start.toString(),
          end: findedCourse.end.toString(),
          allDay: findedCourse.allDay,
        };
        const unrealUser = { username: "aboba", id: "adad123jn1n4r8jrfiu2398" };
        token = jwt.sign(unrealUser, SECRET);
        await api
          .put(`/api/courses/${findedCourse._id.toString()}`)
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
