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
  mongoDb: {
    EXPIRATION_TIME: parseInt(process.env.MONGODB_EXPIRATION_TIME),
    DATA_BASE_URL: process.env.MONGODB_URI,
    // "mongodb+srv://Japahuep:Yr2dQn6KFb2pRsL@dungeon.oo2bkhb.mongodb.net/sessionsChl13?retryWrites=true&w=majority",
    // DATA_BASE_URL: process.env.MONGODB_DATA_BASE_URL,
    ADVANCED_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  server: {
    // PORT: args.p,
    PORT: process.env.PORT || 8080,
    MODE: args.m.toUpperCase(),
  },
};
