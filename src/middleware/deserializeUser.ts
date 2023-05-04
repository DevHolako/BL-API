import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import { refreshAccessToken } from "../service/SessionService";
export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  const refreshToken = get(req, "headers.x-refresh") as string;
  if (!token) {
    return next();
  }
  const { expired, decoded } = verifyJwt(token);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    const newToken = (await refreshAccessToken({ refreshToken })) as string;
    if (newToken) {
      res.setHeader("x-access-token", newToken);
    }
    const result = verifyJwt(newToken);
    res.locals.user = result.decoded;
    return next();
  }
  return next();
};
