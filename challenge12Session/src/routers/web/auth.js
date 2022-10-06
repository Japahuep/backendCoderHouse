import { Router } from "express";

import path from "path";
const __dirname = path.resolve();

const authWebRouter = new Router();

authWebRouter.get("/", (req, res) => {
  res.send("Express server ready");
});

authWebRouter.get("/login", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`You are visited this site ${req.session.counter} times`);
  } else {
    req.session.counter = 1;
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
});

authWebRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ status: "Logout error", body: err });
    } else {
      res.send("Logout ok");
    }
  });
});

authWebRouter.post("/login", (req, res) => {
  req.session.name = req.body.name;
  res.redirect("/home");
});

export default authWebRouter;
