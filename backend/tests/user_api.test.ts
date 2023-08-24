/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import User from "../models/User";
import Schedule from "../models/schedule";
import { setUpDB } from "./helper";

const api = supertest(app);

jest.setTimeout(20000);

test("users are returned as json", async () => {
  await api
    .get("/api/users/all")
    .expect(200)
    .expect("Content-type", /application\/json/);
});

describe("1 user initially saved", () => {
  beforeEach(async () => {
    await setUpDB();
  });
  test("all users are returned correctly", async () => {
    const users = await api.get("/api/users/all");
    expect(users.body).toHaveLength(1);
    expect(users.body[0].schedules).toHaveLength(2);
    expect(users.body[0].schedules[0].courses).toHaveLength(2);
  });

  test("get user by id works correctly", async () => {
    const all = await api.get("/api/users/all");
    const id = all.body[0].id;
    const user = await api.get(`/api/users/${id}`);
    expect(user.body.username).toBe("admin");
    expect(user.body.schedules).toHaveLength(2);
  });

  test("user schedules endpoint works", async () => {
    const all = await api.get("/api/users/all");
    const id = all.body[0].id;
    const schedules = await api.get(`/api/users/${id}/schedules`);
    expect(schedules.body).toHaveLength(2);
    expect(schedules.body[0].name).toBe("Aalto");
  });

  test("user courses endpoint works", async () => {
    const all = await api.get("/api/users/all");
    const id = all.body[0].id;
    const courses = await api.get(`/api/users/${id}/courses`);
    expect(courses.body).toHaveLength(2);
    expect(courses.body[0].title).toBe("Saksa 1");
  });

  describe("adding a new user", () => {
    test("post new valid user works", async () => {
      const result = await api
        .post("/api/users")
        .send({ username: "dereden", password: "12345" });
      expect(result.status).toBe(201);
      expect(result.body.passwordHash).toBeUndefined();
    });

    test("login works with correct info", async () => {
      const result = await api
        .post("/api/login")
        .send({ username: "admin", password: "admin" });
      expect(result.status).toBe(200);
      expect(result.body.token).toBeDefined();
    });

    test("login doesn't work with incorrect info", async () => {
      await api
        .post("/api/login")
        .send({ username: "aboba", password: "aboba" })
        .expect(401);
    });

    test("post nonvalid user doesn't work", async () => {
      await api.post("/api/users").send({ password: "12345" }).expect(400);
      await api.post("/api/users").send({ username: "dereden" }).expect(400);
      await api
        .post("/api/users")
        .send({ username: "a", password: "a" })
        .expect(400);
      await api
        .post("/api/users")
        .send({ username: "dereden", password: "a" })
        .expect(400);
      await api
        .post("/api/users")
        .send({ username: "a", password: "12345" })
        .expect(400);
    });

    test("same name doesn't work", async () => {
      await api
        .post("/api/users")
        .send({ username: "admin", password: "12345" })
        .expect(400);
    });
  });

  describe("changing user's data", () => {
    let token = "";
    beforeEach(async () => {
      const result = await api
        .post("/api/login")
        .send({ username: "admin", password: "admin" });
      token = result.body.token;
    });
    test("can add new schedule to user's list", async () => {
      const newSchedule = new Schedule({ name: "new Schedule", courses: [] });
      const savedSchedule = await newSchedule.save();
      const user = await User.findOne({ name: "admin" });
      if (user) {
        const list = [...user.schedules, savedSchedule._id];
        const result = await api
          .put(`/api/users/${user._id}`)
          .set("Authorization", String("bearer " + token))
          .send({ schedules: list });
        expect(result.status).toBe(200);
        expect(result.body.schedules).toHaveLength(3);
      }
    });
  });
});

afterAll(() => mongoose.connection.close());
