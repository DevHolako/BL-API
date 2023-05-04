import { Request, Response } from "express";
import log from "../utils/logger";
import { CreateUser } from "../service/UserService";
import { CreateUserInputs } from "../request/UserRequests";
import { omit } from "lodash";
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInputs["body"]>,
  res: Response
) {
  try {
    const user = await CreateUser(req.body);
    return res.send(omit(user, "password"));
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message);
  }
}
