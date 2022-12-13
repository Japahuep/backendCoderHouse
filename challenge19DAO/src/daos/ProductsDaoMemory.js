import { asProductDto } from "../dtos/ProductDto.js";

export default class ProductsDaoMemory {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  init() {
    console.log("Products DAO in memory -> Ready");
  }

  disconnect() {
    console.log("Products DAO in memory -> Closed");
  }

  #getIndex(id) {
    return this.products.findIndex((product) => product.id === id);
  }

  listAll() {
    return asProductDto(this.products);
  }

  list(id) {
    const product = this.products[this.#getIndex(id)];
    if (product) {
      return asProductDto(product);
    } else {
      return "Element not found";
    }
  }

  save(product) {
    product.id = this.id.toString();
    this.id++;
    product.timestamp = Date.now();
    this.products.push(product);
    return asProductDto(product);
  }

  deleteAll() {
    this.products = [];
  }

  delete(id) {
    const index = this.#getIndex(id);
    if (index !== -1) {
      const [deletedProduct] = this.products.splice(index, 1);
      console.log(`Element with id: ${id} deleted`);
      return asProductDto(deletedProduct);
    } else {
      return "Element not found";
    }
  }

  update(newData, id) {
    const index = this.#getIndex(id);
    const updatedProduct = { ...this.products[index], ...newData };
    this.products.splice(index, 1, updatedProduct);
    return asProductDto(updatedProduct);
  }
}
