/* eslint-disable @typescript-eslint/no-unsafe-call */
import { model, Schema } from "mongoose";
import { ICourse } from "../types";

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Schema.Types.Date,
    required: true,
  },
  endDate: {
    type: Schema.Types.Date,
    required: true,
  },
  info: String,
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
