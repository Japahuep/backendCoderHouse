import koaRouter from "koa-router";

import {
  getCartsController,
  postCartController,
  putCartController,
} from "../../controllers/carts.controller.js";

const cartsApiRouter = new koaRouter({ prefix: "/api" });

cartsApiRouter.get("/carts", getCartsController);
cartsApiRouter.post("/newCart", postCartController);
cartsApiRouter.put("/cart", putCartController);

export default cartsApiRouter;
