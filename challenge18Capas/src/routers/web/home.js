import { Router } from "express";
import { webAuth } from "../../auth/index.js";
import { infoLogger } from "../../logger/winston.js";

import {
  getMainController,
  getHomeController,
  getProductTestController,
} from "../../controllers/homeControllers.js";

const homeWebRouter = new Router();

authWebRouter.get("/", infoLogger, getMainController);

// HomePage
homeWebRouter.get("/home", [infoLogger, webAuth], getHomeController);

homeWebRouter.get("/products-test-view", infoLogger, getProductTestController);

export default homeWebRouter;
