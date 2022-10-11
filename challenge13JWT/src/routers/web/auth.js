import { Router } from "express";
const authWebRouter = new Router();

// Passport
import passport from "passport";

import path from "path";
const __dirname = path.resolve();

let sessionName;

authWebRouter.get("/", (req, res) => {
  res.send("Express server ready");
});

// Login
authWebRouter.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    req.session.userName = req.user.username;
    res.redirect("/home");
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
});

authWebRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    const user = req.user;
    console.log(user);
    req.session.userName = req.body.username;
    sessionName = req.session.userName;
    res.redirect("/home");
  }
);

authWebRouter.get("/faillogin", (req, res) => {
  console.log("Login error");
  res.render(path.join(__dirname + "/views/pages/login-error"), {});
});

// Sign up
authWebRouter.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/signup.html"));
});

authWebRouter.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  (req, res) => {
    const user = req.user;
    console.log(user);
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
);

authWebRouter.get("/failsignup", (req, res) => {
  console.log("Signup error");
  res.render(path.join(__dirname + "/views/pages/signup-error"), {});
});

// Logout

authWebRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ status: "Logout error", body: err });
    } else {
      res.render(path.join(__dirname + "/views/pages/logout.ejs"), {
        sessionName,
      });
    }
  });
});

export default authWebRouter;
