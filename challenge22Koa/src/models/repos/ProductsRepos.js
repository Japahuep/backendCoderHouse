import Product from "../Product.js";
import ProductsDaoFactory from "../../classes/ProductsDaoFactory.js";
import { asProductDto } from "../dtos/ProductDto.js";

export default class ProductsRepo {
  #dao;

  constructor() {
    this.#dao = ProductsDaoFactory.getDao();
  }

  async listAll() {
    const products = await this.#dao.listAll();
    return products.map((prod) => {
      return new Product(prod);
    });
  }

  async list(id) {
    const dto = await this.#dao.list(id);
    return new Product(dto);
  }

  async listByCat(cat) {
    const dto = await this.#dao.listByCat(cat);
    return dto.map((prod) => {
      return new Product(prod);
    });
  }

  async add(product) {
    return await this.#dao.save(asProductDto(product));
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  async remove(id) {
    const deleted = await this.#dao.delete(id);
    return new Product(deleted);
  }

  async modify(id, data) {
    const modified = await this.#dao.update(id, data);
    return new Product(modified);
  }

  async finish() {
    await this.#dao.disconnect();
  }
}
