import { object, string } from "zod";

export const createSessionRequest = object({
  body: object({
    username: string({
      required_error: "username is required",
    }),
    password: string({
      required_error: "password is required",
    }),
  }),
});
