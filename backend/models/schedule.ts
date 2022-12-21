import { model, Schema } from "mongoose";
import { ISchedule } from "../types";

const scheduleSchema = new Schema<ISchedule>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

scheduleSchema.set("toJSON", {
  transform: (_doc, returned) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.__v;
  },
});

const Schedule = model<ISchedule>("Schedule", scheduleSchema);

export default Schedule;
