/*=========================[Modules]=========================*/
import app from "./server.js";
// import MongoStore from "connect-mongo";
import cluster from "cluster";
import { cpus } from "os";
const numCpu = cpus().length;

// Passport
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bCrypt from "bcrypt";

import config from "./config/config.js";
import { conectDB } from "./config/controllersdb.js";
import { User } from "./config/models.js";

import { Server as Socket } from "socket.io";
import { Server as HttpServer } from "http";
import addProductsHandlers from "./routers/ws/products.js";
import addMessagesHandlers from "./routers/ws/messages.js";

/*=========================[Passport]========================*/
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

/*==========================[Socket]=========================*/
// Instancia socket
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

// Configuro el socket
io.on("connection", async (socket) => {
  addProductsHandlers(socket, io.sockets);
  addMessagesHandlers(socket, io.sockets);
});

/*==========================[Server]=========================*/
conectDB(config.mongodb.host, config.mongodb.options, (err) => {
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
