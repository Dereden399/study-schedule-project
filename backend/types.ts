import mongoose from "mongoose";

export interface ICourse {
  name: string;
  startDate: Date;
  endDate: Date;
  info?: string;
}

export interface ISchedule {
  name: string;
  description?: string;
  courses: mongoose.Types.ObjectId[];
}
