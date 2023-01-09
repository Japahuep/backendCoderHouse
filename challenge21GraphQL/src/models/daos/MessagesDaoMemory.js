import { asMessageDto } from "../dtos/MessageDto.js";

export class MessagesDaoMemory {
  constructor() {
    this.messages = [];
    this.id = 0;
  }

  init() {
    console.log("Messages DAO in memory -> Ready");
  }

  disconnect() {
    console.log("Messages DAO in memory -> Closed");
  }

  #getIndex(id) {
    return this.messages.findIndex((message) => message.id === id);
  }

  listAll() {
    return asMessageDto(this.messages);
  }

  list(id) {
    const message = this.messages[this.#getIndex(id)];
    if (message) {
      return asMessageDto(message);
    } else {
      return "Element not found";
    }
  }

  save(message) {
    message.id = this.id.toString();
    this.id++;
    message.timestamp = Date.now();
    this.messages.push(message);
    return asMessageDto(message);
  }

  deleteAll() {
    this.messages = [];
  }

  delete(id) {
    const index = this.#getIndex(id);
    if (index !== -1) {
      const [deletedMessage] = this.messages.splice(index, 1);
      console.log(`Element with id: ${id} deleted`);
      return asMessageDto(deletedMessage);
    } else {
      return "Element not found";
    }
  }

  update(id, newData) {
    const index = this.#getIndex(id);
    const updatedMessage = { ...this.messages[index], ...newData };
    this.messages.splice(index, 1, updatedMessage);
    return asMessageDto(updatedMessage);
  }
}
