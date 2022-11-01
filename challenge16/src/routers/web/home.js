import { Router } from "express";
import { webAuth } from "../../auth/index.js";

import { infoLogger } from "../../logger/winston.js";

import path from "path";
const __dirname = path.resolve();
const productsWebRouter = new Router();

productsWebRouter.get("/home", [infoLogger, webAuth], (req, res) => {
  if (req.session.userName) {
    res.render(path.join(__dirname + "/views/pages/home.ejs"), {
      userName: req.session.userName,
    });
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
});

productsWebRouter.get("/products-test-view", infoLogger, (req, res) => {
  res.sendFile(path.join(__dirname + "/views/products-test-view.html"));
});

export default productsWebRouter;
