import Message from "../Message.js";
import MessagesDaoFactory from "../../classes/MessagesDaoFactory.js";
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

  async listByAuthor(author) {
    const dto = await this.#dao.listByAuthor(author);
    return dto.map((auth) => {
      return new Message(auth);
    });
  }

  async add(message) {
    return await this.#dao.save(asMessageDto(message));
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  async remove(id) {
    const deleted = await this.#dao.delete(id);
    return new Message(deleted);
  }
}
