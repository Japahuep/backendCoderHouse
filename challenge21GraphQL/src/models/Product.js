export default class Product {
  #id;
  #title;
  #price;
  #thumbnail;
  #timestamp;

  constructor({ id, title, price, thumbnail, timestamp }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.timestamp = timestamp;
  }
  
  get id() {
    return this.#id;
  }
  
  set id(id) {
    if (!id) throw new Error('"id" es un campo requerido');
    this.#id = id;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    if (!title) throw new Error('"title" es un campo requerido');
    this.#title = title;
  }

  get price() {
    return this.#price;
  }

  set price(price) {
    if (!price) throw new Error('"price" es un campo requerido');
    if (isNaN(price))
      throw new Error(
        '"price" es un campo de caracteres exclusivamente numéricos'
      );
    this.#price = price;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  set thumbnail(thumbnail) {
    if (!thumbnail) throw new Error('"thumbnail" es un campo requerido');
    this.#thumbnail = thumbnail;
  }

  get timestamp() {
    return this.#timestamp;
  }

  set timestamp(timestamp) {
    if (!timestamp) throw new Error('"timestamp" es un campo requerido');
    if (isNaN(timestamp))
      throw new Error(
        '"timestamp" es un campo de caracteres exclusivamente numéricos'
      );
    this.#timestamp = timestamp;
  }
}
