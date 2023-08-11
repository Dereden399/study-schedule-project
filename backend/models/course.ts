/* eslint-disable @typescript-eslint/no-unsafe-call */
import { model, Schema } from "mongoose";
import { ICourse } from "../types";

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Schema.Types.Date,
    required: true,
  },
  end: {
    type: Schema.Types.Date,
    required: true,
  },
  info: String,
  allDay: {
    type: Schema.Types.Boolean,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

courseSchema.set("toJSON", {
  transform: (_doc, returned) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.__v;
  },
});

const Course = model<ICourse>("Course", courseSchema);

export default Course;
