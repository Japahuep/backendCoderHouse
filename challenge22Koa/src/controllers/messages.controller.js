import {
  getMsgs,
  getMsgByAuthor,
  postMsgs,
} from "../services/messages.service.js";

const getMsgsController = async (ctx) => {
  try {
    const data = await getMsgs();
    ctx.response.status = 200;
    ctx.body = { message: data };
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: error };
  }
};

const getMsgByAuthorController = async (ctx) => {
  const author = ctx.params.email;
  const data = await getMsgByAuthor(author);
  ctx.response.status = 200;
  ctx.body = { message: data };
};

const postMsgsController = async (ctx) => {
  const message = ctx.request.body;
  const data = await postMsgs(message);
  ctx.body = { message: data };
};

export { getMsgsController, getMsgByAuthorController, postMsgsController };
