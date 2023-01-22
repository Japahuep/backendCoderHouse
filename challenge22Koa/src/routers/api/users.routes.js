import koaRouter from "koa-router";
import {
  getUsersController,
  getUserController,
  postUserController,
} from "../../controllers/users.controller.js";

const usersApiRouter = new koaRouter({ prefix: "/api" });

usersApiRouter.get("/users", getUsersController);
usersApiRouter.get("/user", getUserController);
usersApiRouter.post("/user", postUserController);

export default usersApiRouter;
