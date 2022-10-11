export default {
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: `./DB/ecommerce.sqlite`,
    },
    useNullAsDefault: true,
  },
  mariaDb: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "coderhouse",
    },
  },
  fileSystem: {
    path: "./DB",
  },
  mongoDb: {
    EXPIRATION_TIME: 600000,
    // DATA_BASE_URL:
    //   "mongodb+srv://Japahuep:Yr2dQn6KFb2pRsL@dungeon.oo2bkhb.mongodb.net/sessionsChl13?retryWrites=true&w=majority",
    DATA_BASE_URL: "mongodb://localhost:27017/coderhouseDesafio13",
    // ADVANCED_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
  },
};
