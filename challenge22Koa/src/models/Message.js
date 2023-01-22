export default class Message {
  #id;
  #author;
  #text;
  #fyh;
  #timestamp;

  constructor({ id, author, text, fyh, timestamp }) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.fyh = fyh;
    this.timestamp = timestamp;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    if (!id) throw new Error('"id" es un campo requerido');
    this.#id = id;
  }

  get author() {
    return this.#author;
  }

  set author(author) {
    if (!author) throw new Error('"author" es un campo requerido');
    this.#author = author;
  }

  get text() {
    return this.#text;
  }

  set text(text) {
    if (!text) throw new Error('"text" es un campo requerido');
    this.#text = text;
  }

  get fyh() {
    return this.#fyh;
  }

  set fyh(fyh) {
    if (!fyh) throw new Error('"fyh" es un campo requerido');
    this.#fyh = fyh;
  }

  get timestamp() {
    return this.#timestamp;
  }

  set timestamp(timestamp) {
    if (!timestamp) throw new Error('"timestamp" es un campo requerido');
    if (!Number.isInteger(timestamp))
      throw new Error(
        '"timestamp" es un campo de caracteres exclusivamente numéricos'
      );
    this.#timestamp = timestamp;
  }
}
