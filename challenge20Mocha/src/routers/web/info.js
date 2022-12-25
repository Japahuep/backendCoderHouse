import { Router } from "express";
import compression from "compression";
import {
  getInfoController,
  getCompressedInfoController,
} from "../../controllers/infoControllers.js";

const infoWebRouter = new Router();

infoWebRouter.get("/info", getInfoController);

infoWebRouter.get(
  "/compressed-info",
  compression(),
  getCompressedInfoController
);

export default infoWebRouter;
