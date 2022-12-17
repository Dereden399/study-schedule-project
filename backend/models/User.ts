import mongoose, { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    minlength: 5,
    unique: true,
  },
  passwordHash: String,
  schedules: [{ type: mongoose.Types.ObjectId, ref: "Schedule" }],
});

userSchema.plugin(mongooseUniqueValidator);

userSchema.set("toJSON", {
  transform: (_doc, returned) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.__v;
    delete returned.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
