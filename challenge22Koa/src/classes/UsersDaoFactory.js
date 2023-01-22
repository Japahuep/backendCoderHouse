import { UsersDaoDb } from "../models/daos/UsersDaoDb.js";

import config from "../config/config.js";

const option = process.argv[2];

let dao;

switch (option) {
  default:
    const cnxStr = config.mongodb.host;
    dao = new UsersDaoDb(cnxStr);
    await dao.init();
}

export default class UsersDaoFactory {
  static getDao() {
    return dao;
  }
}
