import koaRouter from "koa-router";

import {
  getProdsController,
  getProdByIdController,
  getProdByCatController,
  postProdController,
} from "../../controllers/products.controller.js";

const productsApiRouter = new koaRouter({ prefix: "/api" });

productsApiRouter.get("/products", getProdsController);
productsApiRouter.get("/product/:id", getProdByIdController);
productsApiRouter.get("/products/:category", getProdByCatController);
productsApiRouter.post("/products", postProdController);

export default productsApiRouter;
