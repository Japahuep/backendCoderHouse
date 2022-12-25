import supertest from "supertest";
import { assert, expect } from "chai";

import app from "../src/server.js";
import config from "../src/config/config.js";
import ProductsRepos from "../src/models/repos/ProductsRepos.js";
const productsApi = new ProductsRepos();

let request;
let server;

describe("TEST API RESTFULL", () => {
  before(async () => {
    server = app.listen(config.server.PORT, (err) => {
      if (err) return console.log(`Server error ${err}`);
      console.log(
        `Server http running on port ${config.server.PORT} - PID ${process.pid}`
      );
    });
    request = supertest(
      `http://localhost:${config.server.PORT}/api/products-test`
    );
  });

  after(function () {
    productsApi.finish();
    server.close();
  });

  describe("POST", () => {
    it("Se agrega un producto", async () => {
      let products = await productsApi.listAll();
      const initialLength = products.length;
      let randomProduct = await request.get("?qty=1");
      randomProduct = randomProduct._body;
      await productsApi.add(randomProduct[0]);
      products = await productsApi.listAll();
      const finalLength = products.length;
      expect(finalLength - initialLength).to.eql(1);
    });
  });

  describe("GET", () => {
    it("Se obtiene un producto random (object)", async () => {
      const response = await request.get("?qty=1");
      assert.typeOf(response._body[0], "object");
    });
    it("Se obtiene una lista de productos (array)", async () => {
      const response = await productsApi.listAll();
      assert.typeOf(response, "array");
    });
  });

  describe("DELETE", () => {
    it("Se elimina un producto", async () => {
      let products = await productsApi.listAll();
      const initialLength = products.length;
      const lastId = products[products.length - 1].id;
      await productsApi.remove(lastId);
      products = await productsApi.listAll();
      const finalLength = products.length;
      expect(finalLength - initialLength).to.eql(-1);
    });
  });

  describe("UPDATE", () => {
    it("Se actualiza un producto", async () => {
      let randomProduct = await request.get("?qty=1");
      randomProduct = randomProduct._body;
      await productsApi.add(randomProduct[0]);

      const products = await productsApi.listAll();
      randomProduct = await request.get("?qty=1");
      randomProduct = randomProduct._body;
      const lastId = products[products.length - 1].id;
      const updatedProduct = await productsApi.modify(lastId, randomProduct[0]);
      const updatedProducts = await productsApi.listAll();
      expect(updatedProducts).to.deep.include(updatedProduct);
    });
  });
});
