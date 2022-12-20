import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: "invalid token" });
  } else {
    res.status(400).send({ error: error.message });
  }
  next(error);
};

export const tokenExtractor = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};
