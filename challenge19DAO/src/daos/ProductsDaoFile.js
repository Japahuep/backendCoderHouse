import { promises as fs } from "fs";
import { asProductDto } from "../dtos/ProductDto.js";

export class ProductsDaoFile {
  #ready = false;

  constructor(route) {
    this.route = route;
    this.products = [];
  }

  async init() {
    try {
      await fs.readFile(this.route, "utf-8");
      this.#ready = true;
      console.log("Products DAO in file -> Ready");
    } catch (error) {
      await fs.writeFile(this.route, "[]");
      this.#ready = true;
      console.log("Products DAO in file -> Ready");
    }
  }

  disconnect() {
    console.log("Products DAO in file -> Closed");
  }

  #checkReady() {
    if (!this.#ready) throw new Error("INTERNAL_ERROR: DAO not connected");
  }

  async #readFile() {
    this.#checkReady();
    const text = await fs.readFile(this.route, "utf-8");
    this.products = JSON.parse(text);
  }

  async #writeFile() {
    this.#checkReady();
    const text = JSON.stringify(this.products, null, 2);
    await fs.writeFile(this.route, text);
  }

  #getIndex(id) {
    return this.products.findIndex((product) => product.id === id);
  }

  async listAll() {
    await this.#readFile();
    return asProductDto(this.products);
  }

  async list(id) {
    await this.#readFile();
    return asDto(this.products[this.#getIndex(id)]);
  }

  async save(product) {
    await this.#readFile();
    let id;
    const length = this.products.length;
    if (length > 0) {
      id = parseInt(this.products[length - 1].id) + 1;
    } else {
      id = 0;
    }
    product.id = id.toString();
    product.timestamp = Date.now();
    this.products.push(product);
    await this.#writeFile();
    return asProductDto(product);
  }

  async deleteAll() {
    this.products = [];
    console.log("\nThe products has been removed\n");
    await this.#writeFile();
  }

  async delete(id) {
    await this.#readFile();
    const [deletedProducts] = this.products.splice(this.#getIndex(id), 1);
    await this.#writeFile();
    console.log(`\nThe product with id: ${id} has been removed\n`);
    return asProductDto(deletedProducts);
  }

  async update(newData, id) {
    await this.#readFile();
    const index = this.#getIndex(id);
    const updatedProduct = { ...this.products[index], ...newData };
    this.products.splice(index, 1, updatedProduct);
    await this.#writeFile();
    return asProductDto(updatedProduct);
  }
}
