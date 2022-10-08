import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import config from "./config.js";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import authWebRouter from "./routers/web/auth.js";
import productsWebRouter from "./routers/web/home.js";
import productsApiRouter from "./routers/api/products.js";

import addProductsHandlers from "./routers/ws/products.js";
import addMessagesHandlers from "./routers/ws/messages.js";

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//--------------------------------------------
// configuro el socket

io.on("connection", async (socket) => {
  addProductsHandlers(socket, io.sockets);
  addMessagesHandlers(socket, io.sockets);
});

//--------------------------------------------
// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const URL =
  "mongodb+srv://Japahuep:Yr2dQn6KFb2pRsL@dungeon.oo2bkhb.mongodb.net/sessions?retryWrites=true&w=majority";
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: URL,
      mongoOptions: advancedOptions,
      ttl: 60,
    }),
    secret: "secret",
    resave: false,
    saveUnitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

//--------------------------------------------
// rutas del servidor API REST
app.use("", productsApiRouter);
//--------------------------------------------
// rutas del servidor web
app.use("", authWebRouter);
app.use("", productsWebRouter);

//--------------------------------------------
// inicio el servidor
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Server http listening in the port ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) => console.log(`Server error ${error}`));
