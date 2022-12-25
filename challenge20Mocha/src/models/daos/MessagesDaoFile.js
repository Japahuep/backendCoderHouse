import { promises as fs } from "fs";
import { asMessageDto } from "../dtos/MessageDto.js";

export class MessagesDaoFile {
  #ready = false;

  constructor(route) {
    this.route = route;
    this.messages = [];
    this.id = 0;
  }

  async init() {
    try {
      await fs.readFile(this.route, "utf-8");
      this.#ready = true;
      console.log("Messages DAO in file -> Ready");
    } catch (error) {
      await fs.writeFile(this.route, "[]");
      this.#ready = true;
      console.log("Messages DAO in file -> Ready");
    }
  }

  disconnect() {
    console.log("Messages DAO in file -> Closed");
  }

  #checkReady() {
    if (!this.#ready) throw new Error("INTERNAL_ERROR: DAO not connected");
  }

  async #readFile() {
    this.#checkReady();
    const text = await fs.readFile(this.route, "utf-8");
    this.messages = JSON.parse(text);
  }

  async #writeFile() {
    this.#checkReady();
    const text = JSON.stringify(this.messages, null, 2);
    await fs.writeFile(this.route, text);
  }

  #getIndex(id) {
    return this.messages.findIndex((message) => message.id === id);
  }

  async listAll() {
    await this.#readFile();
    return asMessageDto(this.messages);
  }

  async list(id) {
    await this.#readFile();
    return asDto(this.messages[this.#getIndex(id)]);
  }

  async save(message) {
    await this.#readFile();
    let id;
    const length = this.messages.length;
    if (length > 0) {
      console.log(this.messages[-1]);
      id = parseInt(this.messages[length - 1].id) + 1;
    } else {
      id = 0;
    }
    message.id = id.toString();
    message.timestamp = Date.now();
    this.messages.push(message);
    await this.#writeFile();
    return asMessageDto(message);
  }

  async deleteAll() {
    this.messages = [];
    console.log("\nThe messages has been removed\n");
    await this.#writeFile();
  }

  async deleteById(id) {
    await this.#readFile();
    const [deletedMessages] = this.messages.splice(this.#getIndex(id), 1);
    await this.#writeFile();
    console.log(`\nThe message with id: ${id} has been removed\n`);
    return asMessageDto(deletedMessages);
  }

  async update(newData, id) {
    await this.#readFile();
    const index = this.#getIndex(id);
    const updatedMessages = { ...this.messages[index], ...newData };
    this.messages.splice(index, 1, updatedMessages);
    await this.#writeFile();
    return asMessageDto(updatedMessages);
  }
}
