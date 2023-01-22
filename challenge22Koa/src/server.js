/*=========================[Modules]=========================*/
import koa from "koa";
import { koaBody } from "koa-body";
import session from "koa-session";
import authWebRouter from "./routers/web/auth.routes.js";
import homeWebRouter from "./routers/web/home.routes.js";
import productsApiRouter from "./routers/api/products.routes.js";
import usersApiRouter from "./routers/api/users.routes.js";
import messagesApiRouter from "./routers/api/messages.routes.js";
import cartsApiRouter from "./routers/api/carts.routes.js";

/*=======================[Koa instance]======================*/
const app = new koa();

/*=======================[Middlewares]=======================*/
app.use(koaBody());

app.keys = [""];
app.use(session(app));

/*==========================[Routes]=========================*/
// Rutas del servidor API REST
app.use(productsApiRouter.routes());
app.use(usersApiRouter.routes());
app.use(messagesApiRouter.routes());
app.use(cartsApiRouter.routes());

// Rutas del servidor web
app.use(authWebRouter.routes());
app.use(homeWebRouter.routes());
export default app;
