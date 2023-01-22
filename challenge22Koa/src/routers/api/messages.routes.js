import koaRouter from "koa-router";

import {
  getMsgsController,
  getMsgByAuthorController,
  postMsgsController,
} from "../../controllers/messages.controller.js";

const messagesApiRouter = new koaRouter({ prefix: "/api" });

messagesApiRouter.get("/messages", getMsgsController);
messagesApiRouter.get("/chat/:email", getMsgByAuthorController);
messagesApiRouter.post("/chat", postMsgsController);

export default messagesApiRouter;
