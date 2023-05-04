import { FilterQuery, ObtainDocumentType } from "mongoose";
import User, { UserDocument } from "../model/User";
import { omit } from "lodash";
import log from "../utils/logger";
export async function CreateUser(
  inputs: ObtainDocumentType<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await User.create(inputs);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await User.findOne({ username });
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}
