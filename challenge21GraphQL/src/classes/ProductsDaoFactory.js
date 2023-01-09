import { ProductsDaoDb } from "../models/daos/ProductsDaoDb.js";
import { ProductsDaoFile } from "../models/daos/ProductsDaoFile.js";
import ProductsDaoMemory from "../models/daos/ProductsDaoMemory.js";
import { ProductsDaoSql } from "../models/daos/ProductsDaoSql.js";

import config from "../config/config.js";

const option = process.argv[2] || "Mem";

let dao;

switch (option) {
  case "Mongo":
    const cnxStr = config.mongodb.host;
    dao = new ProductsDaoDb(cnxStr);
    await dao.init();
    break;
  case "File":
    const productsFileRoute = config.fileSystem.path + "/products.json";
    dao = new ProductsDaoFile(productsFileRoute);
    await dao.init();
    break;
  case "Sql":
    const conf = config.sqlite3;
    dao = new ProductsDaoSql(conf, "products");
  default:
    dao = new ProductsDaoMemory();
}

export default class ProductsDaoFactory {
  static getDao() {
    return dao;
  }
}
