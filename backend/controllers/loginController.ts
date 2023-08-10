import express, { RequestHandler } from "express";
import User from "../models/User";
import { parseString } from "../utils";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const loginController = express.Router();

const SECRET = process.env.SECRET || "SECRET";

loginController.post("/", (async (req, res) => {
  const username = parseString(req.body.username);
  const passwordHashBody = parseString(req.body.password);
  const user = await User.findOne({ username: username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(passwordHashBody, user.passwordHash);
  if (!passwordCorrect) {
    res.status(401).json({ error: "Incorrect password or username" });
    return;
  }
  const userForToken = {
    username: user?.username,
    id: user?._id,
  };
  const token = jwt.sign(userForToken, SECRET);
  res
    .status(200)
    .json({ token: token, username: user?.username, id: user?._id });
}) as RequestHandler);

loginController.post("/check", (async (req, res) => {
  const token = parseString(req.body.token);
  const decodedToken = jwt.verify(token || "invalid_token", SECRET) as {
    username: string;
    id: string;
  };
  const user = await User.findById(decodedToken.id);
  if (user) {
    res.status(200).json(decodedToken);
  } else throw new Error("invalid token");
}) as RequestHandler);

export default loginController;
