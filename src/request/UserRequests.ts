import exp from "constants";
import { TypeOf, object, string } from "zod";
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    username: string({ required_error: "username is required" }),
    password: string({ required_error: "password is required" }).min(
      6,
      "password must be more than 6 chars minimum"
    ),
    passwordConfirmation: string({ required_error: "password confirm is required" }),
  }).refine(data => data.password === data.passwordConfirmation, {
      message: "passwords do not match",
      path: ['passwordConfirmation']
  }),
});

export type CreateUserInputs = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">;