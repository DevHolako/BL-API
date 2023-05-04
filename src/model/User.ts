import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import log from "../utils/logger";

export interface UserDocument extends mongoose.Document {
  username: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(IncPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  IncPassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(IncPassword, user.password).catch((e) => false);
};
const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
