import User from "../User.js";
import UsersDaoFactory from "../../classes/UsersDaoFactory.js";
import { asUserDto } from "../dtos/UserDto.js";

export default class UsersRepo {
  #dao;

  constructor() {
    this.#dao = UsersDaoFactory.getDao();
  }

  async listAll() {
    const users = await this.#dao.listAll();
    return users.map((prod) => {
      return new User(prod);
    });
  }

  async list(id) {
    const dto = await this.#dao.list(id);
    return new User(dto);
  }

  async add(user) {
    return await this.#dao.save(asUserDto(user));
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  async remove(id) {
    const deleted = await this.#dao.delete(id);
    return new User(deleted);
  }

  async modify(id, data) {
    const modified = await this.#dao.update(id, data);
    return new User(modified);
  }

  async finish() {
    await this.#dao.disconnect();
  }
}
