import { ProductsDaoDb } from "../models/daos/ProductsDaoDb.js";

import config from "../config/config.js";

const option = process.argv[2];

let dao;

switch (option) {
  default:
    const cnxStr = config.mongodb.host;
    dao = new ProductsDaoDb(cnxStr);
    await dao.init();
}

export default class ProductsDaoFactory {
  static getDao() {
    return dao;
  }
}
