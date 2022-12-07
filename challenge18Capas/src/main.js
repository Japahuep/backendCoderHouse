import express from "express";
import session from "express-session";
// import MongoStore from "connect-mongo";
import cluster from "cluster";
import { cpus } from "os";
const numCpu = cpus().length;
import { logger } from "./logger/winston.js";

// Passport
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bCrypt from "bcrypt";

// Project modules imports
import config from "./config.js";
import { conectDB } from "./controllersdb.js";
import { User } from "./models.js";

import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import productsApiRouter from "./routers/api/products.js";
// import randomApiRouter from "./routers/api/randoms.js";
import infoWebRouter from "./routers/web/info.js";

import { Server as Socket } from "socket.io";
import { Server as HttpServer } from "http";
import addProductsHandlers from "./routers/ws/products.js";
import addMessagesHandlers from "./routers/ws/messages.js";

//--------------------------------------------
// Passport
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            return done(err);
          }
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

//--------------------------------------------
// Instancia servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//--------------------------------------------
// Configuro el socket
io.on("connection", async (socket) => {
  addProductsHandlers(socket, io.sockets);
  addMessagesHandlers(socket, io.sockets);
});

//--------------------------------------------
// Configuro el servidor
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
      maxAge: config.mongoDb.EXPIRATION_TIME,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------
// Rutas del servidor API REST
app.use("", productsApiRouter);
// app.use("", randomApiRouter);

//--------------------------------------------
// Rutas del servidor web
app.use("", authWebRouter);
app.use("", homeWebRouter);
app.use("", infoWebRouter);
app.get("*", (req, res) => {
  logger.warn("Route not implemented");
  res.send("Route not implemented");
});

//--------------------------------------------
// Inicio el servidor
conectDB(config.mongoDb.DATA_BASE_URL, (err) => {
  if (err) return console.log("Database connection error", err);
  console.log("Database connected");

  if (cluster.isPrimary && config.server.MODE === "CLUSTER") {
    for (let i = 0; i < numCpu; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Work ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    httpServer.listen(config.server.PORT, (err) => {
      if (err) return console.log(`Server error ${err}`);
      console.log(
        `Server http running on port ${config.server.PORT} - PID ${process.pid}`
      );
    });
  }
});
