import Cart from "../Cart.js";
import CartDaoFactory from "../../classes/CartsDaoFactory.js";
import { asCartDto } from "../dtos/CartDto.js";

export default class CartRepo {
  #dao;

  constructor() {
    this.#dao = CartDaoFactory.getDao();
  }

  async listAll() {
    const carts = await this.#dao.listAll();
    return carts.map((cart) => {
      return new Cart(cart);
    });
  }

  async list(id) {
    const dto = await this.#dao.list(id);
    return new Cart(dto);
  }

  async add(cart) {
    const dto = await this.#dao.save(asCartDto(cart));
    return new Cart(dto);
  }

  async includeProd(id, prod) {
    const dto = await this.#dao.includeProd(id, prod);
    return new Cart(dto);
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  async remove(id) {
    const deleted = await this.#dao.delete(id);
    return new Cart(deleted);
  }

  async removeAllProd(id) {
    await this.#dao.removeAllProd(id);
  }

  async removeProd(id, prod) {
    const removed = await this.#dao.removeProd(id, prod);
    return removed;
  }

  async modify(id, data) {
    const modified = await this.#dao.update(id, data);
    return new Cart(modified);
  }

  async finish() {
    await this.#dao.disconnect();
  }
}
