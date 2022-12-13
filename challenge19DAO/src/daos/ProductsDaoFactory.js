import { ProductsDaoDb } from "./ProductsDaoDb.js";
import { ProductsDaoFile } from "./ProductsDaoFile.js";
import ProductsDaoMemory from "./ProductsDaoMemory.js";
import { ProductsDaoSql } from "./ProductsDaoSql.js";

import config from "../config.js";

const option = process.argv[2] || "Mem";

let dao;

switch (option) {
  case "Mongo":
    const cnxStr = config.mongoDb.DATA_BASE_URL;
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
