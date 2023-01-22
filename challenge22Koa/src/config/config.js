import dotenv from "dotenv";
dotenv.config();

import parseArgs from "minimist";
const options = {
  default: { mode: "fork" },
  alias: { m: "mode" },
};
const args = parseArgs(process.argv, options);

export default {
  mongodb: {
    host: process.env.MONGO_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: parseInt(process.env.MONGODB_EXPIRATION_TIME),
    },
  },
  server: {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MODE: args.m.toUpperCase(),
  },
};
