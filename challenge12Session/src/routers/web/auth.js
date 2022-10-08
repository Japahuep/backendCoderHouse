import { Router } from "express";

import path from "path";
const __dirname = path.resolve();

const authWebRouter = new Router();

let sessionName;

authWebRouter.get("/", (req, res) => {
  res.send("Express server ready");
});

authWebRouter.get("/login", (req, res) => {
  if (sessionName) {
    res.send(`You are loged ${sessionName}`);
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
});

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

authWebRouter.post("/login", (req, res) => {
  req.session.name = req.body.name;
  sessionName = req.session.name;
  res.redirect("/home");
});

export default authWebRouter;
