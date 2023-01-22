import ProductsRepos from "../models/repos/ProductsRepos.js";
const products = new ProductsRepos();

const objectsPrinter = (objs) => {
  let printableData;
  if (Array.isArray(objs)) {
    printableData = objs.map((obj) => {
      const { id, title, price, thumbnail, category, timestamp } = obj;
      return { id, title, price, thumbnail, category, timestamp };
    });
  } else {
    const { id, title, price, thumbnail, category, timestamp } = objs;
    printableData = { id, title, price, thumbnail, category, timestamp };
  }
  return printableData;
};

const getProducts = async () => {
  let data = await products.listAll();
  data = objectsPrinter(data);
  return data;
};

const getProduct = async (id) => {
  let data = await products.list(id);
  data = objectsPrinter(data);
  return data;
};

const getProdByCat = async (cat) => {
  try {
    let data = await products.listByCat(cat);
    data = objectsPrinter(data);
    return data;
  } catch {
    throw new Error("Error in getProduct function");
  }
};

const postProd = async (prod) => {
  const data = await products.add(prod);
  return data;
};

export { getProducts, getProduct, getProdByCat, postProd };
