import koaRouter from "koa-router";
import { infoLogger } from "../../config/loggers.js";

import {
  getMainController,
  getHomeController,
  getProductTestController,
} from "../../controllers/home.controller.js";

const homeWebRouter = new koaRouter({ prefix: "" });

homeWebRouter.get("/", infoLogger, getMainController);

// HomePage
homeWebRouter.get("/home", getHomeController);

homeWebRouter.get("/products-test-view", infoLogger, getProductTestController);

export default homeWebRouter;
