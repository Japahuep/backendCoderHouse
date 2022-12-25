import parseArgs from "minimist";
const options = {
  default: { port: 8080, mode: "fork" },
  alias: { p: "port", m: "mode" },
};
const args = parseArgs(process.argv, options);

import * as dotenv from "dotenv";
dotenv.config();

export default {
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: process.env.SQLITE3_FILENAME,
    },
    useNullAsDefault: true,
  },
  mariaDb: {
    client: "mysql",
    connection: {
      host: process.env.MARIADB_HOST,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
    },
  },
  fileSystem: {
    path: process.env.FILESYSTEM_PATH,
  },
  mongodb: {
    host: process.env.MONGO_URL,
    //   "mongodb+srv://Japahuep:Yr2dQn6KFb2pRsL@dungeon.oo2bkhb.mongodb.net/sessionsChl13?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: parseInt(process.env.MONGODB_EXPIRATION_TIME),
    },
  },
  server: {
    PORT: args.p,
    MODE: args.m.toUpperCase(),
  },
};
