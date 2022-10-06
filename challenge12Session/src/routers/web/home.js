import { Router } from "express";
import { webAuth } from "../../auth/index.js";

import path from "path";
const __dirname = path.resolve();
const productsWebRouter = new Router();

productsWebRouter.get("/home", webAuth, (req, res) => {
  const name = req.session.name;
  console.log(name);
  res.render(path.join(__dirname + "/views/pages/home.ejs"), {
    name,
  });
});

productsWebRouter.get("/products-test-view", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/products-test-view.html"));
});

export default productsWebRouter;
