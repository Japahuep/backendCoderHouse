import CartsRepos from "../models/repos/CartsRepos.js";
const carts = new CartsRepos();

const objectsPrinter = (objs) => {
  let printableData;
  if (Array.isArray(objs)) {
    printableData = objs.map((obj) => {
      const { id, email, fyh, products, address, timestamp } = obj;
      return { id, email, fyh, products, address, timestamp };
    });
  } else {
    const { id, email, fyh, products, address, timestamp } = objs;
    printableData = { id, email, fyh, products, address, timestamp };
  }
  return printableData;
};

const getCarts = async () => {
  let data = await carts.listAll();
  data = objectsPrinter(data);
  return data;
};

const postCart = async (cart) => {
  let data = await carts.add(cart);
  return data;
};

const putCart = async (cartId, prod) => {
  const cart = await carts.includeProd(cartId, prod);
  return cart;
};

export { getCarts, postCart, putCart };
