import { Router } from "express";
import { createNFakeProducts } from "../../utils/mocks/products.js";

const productsApiRouter = new Router();

productsApiRouter.get("/api/products-test", (req, res) => {
  const qty = parseInt(req.query.qty);
  res.json(createNFakeProducts(qty));
});

export default productsApiRouter;
