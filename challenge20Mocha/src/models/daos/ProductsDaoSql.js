import knex from "knex";
import { asProductDto } from "../dtos/ProductDto.js";

export class ProductsDaoSql {
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
      return asProductDto(elements);
    } catch (err) {
      return elements;
    }
  }

  async list(id) {
    const elem = await this.knex.from(this.table).select("*").where("id", id);
    return asProductDto(elem);
  }

  async save(elem) {
    await this.knex(this.table).insert(elem);
    return asProductDto(elem);
  }

  async deleteAll() {
    await this.knex.from(this.table).del();
  }

  async delete(id) {
    await this.knex.from(this.table).where("id", id).del();
  }

  async update(id, elem) {
    await this.knex.from(this.table).where("id", id).update(elem);
  }
}
