import knex from "knex";
import { asMessageDto } from "../dtos/MessageDto.js";

export class MessagesDaoSql {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
    this.id = 0;
  }

  async disconnect() {
    await this.knex.destroy();
  }

  async listAll() {
    let elements = [];
    try {
      const elementsDB = await this.knex.from(this.table).select("*");
      for (let element of elementsDB) {
        elements.push({ ...element });
      }
      return asMessageDto(elements);
    } catch (err) {
      return elements;
    }
  }

  async list(id) {
    const elem = await this.knex.from(this.table).select("*").where("id", id);
    return asMessageDto(elem);
  }

  async save(elem) {
    await this.knex(this.table).insert(elem);
    return asMessageDto(elem);
  }

  async deleteAll() {
    await this.knex.from(this.table).del();
  }

  async delete(id) {
    await this.knex.from(this.table).where("id", id).del();
  }

  async update(elem, id) {
    await this.knex.from(this.table).where("id", id).update(elem);
  }
}
