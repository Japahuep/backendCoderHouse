// Repos
import ProductsRepo from "../models/repos/ProductsRepos.js";
const productsApi = new ProductsRepo();

const qryProducts = () => {
  return productsApi.listAll();
};

const qryProduct = (id) => {
  return productsApi.list(id);
};

const createProduct = ({ data }) => {
  return productsApi.add(data);
};

const updateProduct = ({ id, data }) => {
  return productsApi.modify(id, data);
};

const deleteProduct = ({ id }) => {
  return productsApi.remove(id);
};

export { qryProducts, qryProduct, createProduct, updateProduct, deleteProduct };
