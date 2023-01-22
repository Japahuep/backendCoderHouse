// import { Router } from "express";
import koaRouter from "koa-router";
import {
  getLoginController,
  postLoginController,
  getFailLoginController,
  getSignupController,
  postSignUpController,
  getFailSignUpController,
  getLogoutController,
} from "../../controllers/auth.controller.js";

// const authWebRouter = new Router();
const authWebRouter = new koaRouter({ prefix: "" });

//--------------------------------------------

import { infoLogger } from "../../config/loggers.js";

//--------------------------------------------
// Routes
// *Login
authWebRouter.get("/login", infoLogger, getLoginController);
authWebRouter.post("/login", postLoginController);
authWebRouter.get("/faillogin", infoLogger, getFailLoginController);

// *Sign up
authWebRouter.get("/signup", infoLogger, getSignupController);
authWebRouter.post("/signup", infoLogger, postSignUpController);
authWebRouter.get("/failsignup", infoLogger, getFailSignUpController);

// *Logout
authWebRouter.get("/logout", infoLogger, getLogoutController);

export default authWebRouter;
