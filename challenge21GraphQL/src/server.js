/*=========================[Modules]=========================*/
import express from "express";
import session from "express-session";
import config from "./config/config.js";
import passport from "passport";
import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import infoWebRouter from "./routers/web/info.js";
import productsApiRouter from "./routers/api/products.js";
// import randomApiRouter from "./routers/api/randoms.js";
// GraphQL
import { graphqlHTTP } from "express-graphql";

import {
  qryProducts,
  qryProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./graphql/productsResolvers.js";

import {
  qryMessages,
  qryMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from "./graphql/messagesResolvers.js";

import { productSchema, messageSchema } from "./graphql/schemas.js";

const app = express();

/*=======================[Middlewares]=======================*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: config.mongodb.options.serverSelectionTimeoutMS,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

/*==========================[GraphQL]========================*/
app.use(
  "/graphql/products",
  graphqlHTTP({
    schema: productSchema,
    rootValue: {
      qryProducts,
      qryProduct,
      createProduct,
      updateProduct,
      deleteProduct,
    },
    graphiql: false,
  })
);

app.use(
  "/graphql/messages",
  graphqlHTTP({
    schema: messageSchema,
    rootValue: {
      qryMessages,
      qryMessage,
      createMessage,
      updateMessage,
      deleteMessage,
    },
    graphiql: false,
  })
);

/*==========================[Routes]=========================*/
// Rutas del servidor API REST
app.use("", productsApiRouter);
// app.use("", randomApiRouter);

// Rutas del servidor web
app.use("", authWebRouter);
app.use("", homeWebRouter);
app.use("", infoWebRouter);
app.get("*", (req, res) => {
  logger.warn("Route not implemented");
  res.send("Route not implemented");
});

export default app;
