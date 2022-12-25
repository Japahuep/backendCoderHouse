import axios from "axios";
import config from "../src/config/config.js";
import ProductsRepos from "../src/models/repos/ProductsRepos.js";
const productsApi = new ProductsRepos();

const getProduct = async (n) => {
  const res = await axios.get(`/api/products-test?qty=${n}`, {
    baseURL: `http://localhost:${config.server.PORT}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

const objectsPrinter = (objs) => {
  const printableData = objs.map((obj) => {
    const { id, title, price, thumbnail, timestamp } = obj;
    return { id, title, price, thumbnail, timestamp };
  });
  console.log(printableData);
};

let data = await productsApi.listAll();
console.log("##### INITIAL DATA #####");
objectsPrinter(data);
let randomProduct = await getProduct(1);
await productsApi.add(randomProduct[0]);
data = await productsApi.listAll();
console.log("##### NEW PRODUCT ADDED #####");
objectsPrinter(data);
let lastId = data[data.length - 1].id;
await productsApi.remove(lastId);
data = await productsApi.listAll();
console.log("##### NEW PRODUCT DELETED #####");
objectsPrinter(data);
randomProduct = await getProduct(1);
await productsApi.add(randomProduct[0]);
data = await productsApi.listAll();
console.log("##### NEW PRODUCT ADDED #####");
objectsPrinter(data);
lastId = data[data.length - 1].id;
randomProduct = await getProduct(1);
await productsApi.modify(lastId, randomProduct[0]);
data = await productsApi.listAll();
console.log("##### LAST PRODUCT MODIFIED #####");
objectsPrinter(data);
