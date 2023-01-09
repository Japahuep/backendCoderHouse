import { Router } from "express";
import {
  getLoginController,
  postLoginController,
  getFailLoginController,
  getSignupController,
  postSignUpController,
  getFailSignUpController,
  getLogoutController,
} from "../../controllers/authControllers.js";

const authWebRouter = new Router();

//--------------------------------------------
// Passport
import passport from "passport";
import { infoLogger } from "../../config/loggers.js";

//--------------------------------------------
// Routes
// *Login
authWebRouter.get("/login", infoLogger, getLoginController);
authWebRouter.post(
  "/login",
  [
    infoLogger,
    passport.authenticate("login", { failureRedirect: "/faillogin" }),
  ],
  postLoginController
);
authWebRouter.get("/faillogin", infoLogger, getFailLoginController);

// *Sign up
authWebRouter.get("/signup", infoLogger, getSignupController);
authWebRouter.post(
  "/signup",
  [
    infoLogger,
    passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  ],
  postSignUpController
);
authWebRouter.get("/failsignup", infoLogger, getFailSignUpController);

// *Logout
authWebRouter.get("/logout", infoLogger, getLogoutController);

export default authWebRouter;
