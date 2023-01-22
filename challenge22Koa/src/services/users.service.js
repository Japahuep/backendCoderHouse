import UsersRepos from "../models/repos/UsersRepos.js";
import { createHash } from "../utils/hash.bcrypt.js";
import { postCart } from "./carts.service.js";
const users = new UsersRepos();

const objectsPrinter = (objs) => {
  let printableData;
  if (Array.isArray(objs)) {
    printableData = objs.map((obj) => {
      const { id, username, password, name, age, phone, photo, cart } = obj;
      return { id, username, password, name, age, phone, photo, cart };
    });
  } else {
    const { id, username, password, name, age, phone, photo, cart } = objs;
    printableData = { id, username, password, name, age, phone, photo, cart };
  }
  return printableData;
};

const getUsers = async () => {
  let data = await users.listAll();
  data = objectsPrinter(data);
  return data;
};

const getUser = async (id) => {
  let data = await users.list(id);
  data = objectsPrinter(data);
  return data;
};

const postUser = async (user) => {
  const password = createHash(user.password);
  user.password = password;
  const { username, address } = user;
  const cart = await postCart({ email: username, address });
  const cartId = cart.id;
  user.cart = cartId;
  const data = await users.add(user);
  return objectsPrinter(data);
};

export { getUsers, getUser, postUser };
