import { Express, Request, Response } from "express";
import { createUserHandler } from "../controller/UserController";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../request/UserRequests";
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controller/SessionController";
import { createSessionRequest } from "../request/SessionRequests";
import { requierUser } from "../middleware/requierUser";
function routes(app: Express) {
  app.get("/healtcheck", (req: Request, res: Response) => {
    res.json("healtcheck done ✅").status(200);
  });

  // User Routes
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validate(createSessionRequest),
    createSessionHandler
  );
  app.get("/api/sessions", requierUser, getUserSessionsHandler);
  app.delete("/api/sessions", requierUser, deleteSessionHandler);
}

export default routes;
