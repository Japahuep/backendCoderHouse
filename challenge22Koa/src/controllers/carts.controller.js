import { getCarts, postCart, putCart } from "../services/carts.service.js";

const getCartsController = async (ctx) => {
  try {
    const data = await getCarts();
    ctx.response.status = 200;
    ctx.body = { message: data };
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: error };
  }
};

const postCartController = async (ctx) => {
  const cart = ctx.request.body;
  const data = await postCart(cart);
  ctx.body = { message: data };
};

const putCartController = async (ctx) => {
  const prod = ctx.request.body;
  console.log(ctx.session.user.cart);
  const cartId = ctx.session.user.cart;
  const data = await putCart(cartId, prod);
  ctx.body = { message: data };
};

export { getCartsController, postCartController, putCartController };
