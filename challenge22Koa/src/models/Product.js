export default class Product {
  #id;
  #title;
  #price;
  #thumbnail;
  #category;
  #timestamp;

  constructor({ id, title, price, thumbnail, category, timestamp }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.category = category;
    this.timestamp = timestamp;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    if (!id) throw new Error('"id" is a required field');
    this.#id = id;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    if (!title) throw new Error('"title" is a required field');
    this.#title = title;
  }

  get price() {
    return this.#price;
  }

  set price(price) {
    if (!price) throw new Error('"price" is a required field');
    if (!Number.isInteger(price))
      throw new Error('"price" is a numeric-only character field');
    this.#price = price;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  set thumbnail(thumbnail) {
    if (!thumbnail) throw new Error('"thumbnail" is a required field');
    this.#thumbnail = thumbnail;
  }

  get category() {
    return this.#category;
  }

  set category(category) {
    if (!category) throw new Error('"category" is a required field');
    this.#category = category;
  }

  get timestamp() {
    return this.#timestamp;
  }

  set timestamp(timestamp) {
    if (!timestamp) throw new Error('"timestamp" is a required field');
    if (!Number.isInteger(timestamp))
      throw new Error('"timestamp" is a numeric-only character field');
    this.#timestamp = timestamp;
  }
}
