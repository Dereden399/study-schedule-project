import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
  } else if (error.name == "CastError") {
    res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
