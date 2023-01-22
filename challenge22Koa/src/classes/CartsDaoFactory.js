import { CartsDaoDb } from "../models/daos/CartsDaoDb.js";
import config from "../config/config.js";

const option = process.argv[2];

let dao;

switch (option) {
  default:
    const cnxStr = config.mongodb.host;
    dao = new CartsDaoDb(cnxStr);
    await dao.init();
}

export default class CartsDaoFactory {
  static getDao() {
    return dao;
  }
}
