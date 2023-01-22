export default class User {
  #id;
  #username;
  #password;
  #name;
  #address;
  #age;
  #phone;
  #photo;
  #cart;

  constructor({
    id,
    username,
    password,
    name,
    address,
    age,
    phone,
    photo,
    cart,
  }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.age = age;
    this.phone = phone;
    this.photo = photo;
    this.cart = cart;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    if (!id) throw new Error('"id" is a required field');
    this.#id = id;
  }

  get username() {
    return this.#username;
  }

  set username(username) {
    if (!username) throw new Error('"username" is a required field');
    this.#username = username;
  }

  get password() {
    return this.#password;
  }

  set password(password) {
    if (!password) throw new Error('"password" is a required field');
    this.#password = password;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    if (!name) throw new Error('"name" is a required field');
    this.#name = name;
  }

  get address() {
    return this.#address;
  }

  set address(address) {
    if (!address) throw new Error('"address" is a required field');
    this.#address = address;
  }

  get age() {
    return this.#age;
  }

  set age(age) {
    if (!age) throw new Error('"age" is a required field');
    if (!Number.isInteger(age))
      throw new Error('"phone" is a numeric-only character field');
    this.#age = age;
  }

  get phone() {
    return this.#phone;
  }

  set phone(phone) {
    if (!phone) throw new Error('"phone" is a required field');
    this.#phone = phone;
  }

  get photo() {
    return this.#photo;
  }

  set photo(photo) {
    if (!photo) throw new Error('"photo" is a required field');
    this.#photo = photo;
  }

  get cart() {
    return this.#cart;
  }

  set cart(cart) {
    if (!cart) throw new Error('"cart" is a required field');
    this.#cart = cart;
  }
}
