import {
  getProducts,
  getProduct,
  getProdByCat,
  postProd,
} from "../services/products.service.js";

const getProdsController = async (ctx) => {
  try {
    const data = await getProducts();
    ctx.response.status = 200;
    ctx.body = { message: data };
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: error };
  }
};
const getProdByIdController = async (ctx) => {
  const id = ctx.params.id;
  try {
    const data = await getProduct(id);
    ctx.response.status = 200;
    ctx.body = { message: data };
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: error };
  }
};

const getProdByCatController = async (ctx) => {
  try {
    const category = ctx.params.category;
    const data = await getProdByCat(category);
    ctx.response.status = 200;
    ctx.body = { message: data };
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: error };
  }
};

const postProdController = async (ctx) => {
  try {
    const prod = ctx.request.body;
    const data = await postProd(prod);
    ctx.body = { message: data };
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: error };
  }
};

export {
  getProdsController,
  getProdByIdController,
  getProdByCatController,
  postProdController,
};
