import { getUsers, postUser } from "../services/users.service.js";

const getUsersController = async (ctx) => {
  const data = await getUsers();
  ctx.response.status = 200;
  ctx.body = { data: data };
};

const getUserController = async (ctx) => {
  try {
    const data = ctx.session.user;
    ctx.body = { message: data };
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: error };
  }
};

const postUserController = async (ctx) => {
  let user = ctx.request.body;
  const data = await postUser(user);
  ctx.body = { message: data };
};

export { getUsersController, getUserController, postUserController };
