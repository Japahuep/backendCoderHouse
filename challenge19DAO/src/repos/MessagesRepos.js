import Message from "../models/Message.js";
import MessagesDaoFactory from "../daos/MessagesDaoFactory.js";
import { asMessageDto } from "../dtos/MessageDto.js";

export default class MessagesRepo {
  #dao;

  constructor() {
    this.#dao = MessagesDaoFactory.getDao();
  }

  async listAll() {
    const messages = await this.#dao.listAll();
    return messages.map((p) => new Message(p));
  }

  async list(id) {
    const dto = await this.#dao.list(id);
    return new Message(dto);
  }

  async add(message) {
    await this.#dao.save(asMessageDto(message));
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  async remove(id) {
    const deleted = await this.#dao.delete(id);
    return new Message(deleted);
  }
}
