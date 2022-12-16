/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Course from "../models/course";
import { ICourse } from "../types";

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

test("courses are returned as json", async () => {
  await api
    .get("/api/courses/all")
    .expect(200)
    .expect("Content-type", /application\/json/);
});

describe("working with initial 2 courses", () => {
  beforeEach(async () => {
    await Course.deleteMany({});
    const first = new Course(initialCourses[0]);
    await first.save();
    const second = new Course(initialCourses[1]);
    await second.save();
  });

  test("there are 2 courses saved", async () => {
    const res = await api.get("/api/courses/all");
    expect(res.body).toHaveLength(2);
  });

  test("returning all courses works good", async () => {
    const res = await api.get("/api/courses/all");
    //const contents = res.body.map((x: { content: any }) => x.content);
    expect(res.body[0].name).toBe("Saksa 1");
  });

  test("get course by id works", async () => {
    const all = await api.get("/api/courses/all");
    const id = all.body[0].id;
    const res = await api.get(`/api/courses/${id}`);
    expect(res.body.name).toBe("Saksa 1");
  });

  test("wrong id does not work", async () => {
    await api.get("/api/courses/123123123123123123").expect(400);
  });

  describe("adding new course", () => {
    test("adding valid course", async () => {
      const courseInfo = {
        name: "O1",
        startDate: "2022-12-12",
        endDate: "2022-12-22",
        info: "some info",
      };
      await api.post("/api/courses").send(courseInfo).expect(201);
      const res = await api.get("/api/courses/all");
      expect(res.body).toHaveLength(3);
    });

    test("adding nonvalid course without name", async () => {
      const courseInfo = {
        startDate: "2022-12-12",
        endDate: "2022-12-22",
        info: "some info",
      };
      await api.post("/api/courses").send(courseInfo).expect(400);
    });

    test("adding nonvalid course without start date", async () => {
      const courseInfo = {
        name: "O1",
        endDate: "2022-12-22",
        info: "some info",
      };
      await api.post("/api/courses").send(courseInfo).expect(400);
    });

    test("adding nonvalid course without end date", async () => {
      const courseInfo = {
        startDate: "2022-12-12",
        name: "O1",
        info: "some info",
      };
      await api.post("/api/courses").send(courseInfo).expect(400);
    });

    test("adding valid course without info", async () => {
      const courseInfo = {
        name: "O1",
        startDate: "2022-12-12",
        endDate: "2022-12-22",
      };
      await api.post("/api/courses").send(courseInfo).expect(201);
      const res = await api.get("/api/courses/all");
      expect(res.body).toHaveLength(3);
    });

    test("added course is really in database", async () => {
      const courseInfo = {
        name: "O1",
        startDate: "2022-12-12",
        endDate: "2022-12-22",
        info: "some info",
      };
      await api.post("/api/courses").send(courseInfo).expect(201);
      const res = await api.get("/api/courses/all");
      const id = res.body.find((x: { name: string }) => x.name === "O1").id;
      const findedRes = await api.get(`/api/courses/${id}`);
      expect(findedRes.body.name).toBe("O1");
    });
  });
  describe("deleting", () => {
    test("deleting course with valid id", async () => {
      const courseToDelete = await Course.findOne({ name: "Saksa 1" });
      if (courseToDelete) {
        const id = courseToDelete._id;
        await api.delete(`/api/courses/${id.toString()}`).expect(200);
      }
    });

    test("deleting with nonvalid id", async () => {
      await api.delete("/api/courses/123123123123123").expect(400);
    });
  });
  describe("changing", () => {
    test("changing valid course", async () => {
      const findedCourse = await Course.findOne({ name: "Saksa 1" });
      if (findedCourse) {
        const redacted = {
          name: findedCourse.name + " very good course for beginners",
          startDate: findedCourse.startDate.toString(),
          endDate: findedCourse.endDate.toString(),
        };
        const result = await api
          .put(`/api/courses/${findedCourse._id.toString()}`)
          .send(redacted);
        expect(result.status).toBe(200);
        expect(result.body.name).toBe("Saksa 1 very good course for beginners");
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
