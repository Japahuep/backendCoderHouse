import Product from "../models/Product.js";
import ProductsDaoFactory from "../daos/ProductsDaoFactory.js";
import { asProductDto } from "../dtos/ProductDto.js";

export default class ProductsRepo {
  #dao;

  constructor() {
    this.#dao = ProductsDaoFactory.getDao();
  }

  async listAll() {
    const products = await this.#dao.listAll();
    return products.map((p) => new Product(p));
  }

  async list(id) {
    const dto = await this.#dao.list(id);
    return new Product(dto);
  }

  async add(product) {
    await this.#dao.save(asProductDto(product));
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  async remove(id) {
    const deleted = await this.#dao.delete(id);
    return new Product(deleted);
  }
}
