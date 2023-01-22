export default class Cart {
  #id;
  #email;
  #fyh;
  #products;
  #address;
  #timestamp;

  constructor({ id, email, fyh, products, address, timestamp }) {
    this.id = id;
    this.email = email;
    this.fyh = fyh;
    this.products = products;
    this.address = address;
    this.timestamp = timestamp;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    if (!id) throw new Error('"id" is a required field');
    this.#id = id;
  }

  get email() {
    return this.#email;
  }

  set email(email) {
    if (!email) throw new Error('"email" is a required field');
    this.#email = email;
  }

  get fyh() {
    return this.#fyh;
  }

  set fyh(fyh) {
    if (!fyh) throw new Error('"fyh" is a required field');
    this.#fyh = fyh;
  }

  get products() {
    return this.#products;
  }

  set products(products) {
    if (!products) throw new Error('"products" is a required field');
    this.#products = products;
  }

  get address() {
    return this.#address;
  }

  set address(address) {
    if (!address) throw new Error('"address" is a required field');
    this.#address = address;
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
