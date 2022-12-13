import { MessagesDaoDb } from "./MessagesDaoDb.js";
import { MessagesDaoFile } from "./MessagesDaoFile.js";
import { MessagesDaoMemory } from "./MessagesDaoMemory.js";
import { MessagesDaoSql } from "./MessagesDaoSql.js";

import config from "../config.js";

const option = process.argv[2] || "Mem";

let dao;

switch (option) {
  case "Mongo":
    const cnxStr = config.mongoDb.DATA_BASE_URL;
    dao = new MessagesDaoDb(cnxStr);
    await dao.init();
    break;
  case "File":
    const productsFileRoute = config.fileSystem.path + "/messages.json";
    dao = new MessagesDaoFile(productsFileRoute);
    await dao.init();
    break;
  case "Sql":
    const conf = config.sqlite3;
    dao = new MessagesDaoSql(conf, "products");
  default:
    dao = new MessagesDaoMemory();
}

export default class MessagesDaoFactory {
  static getDao() {
    return dao;
  }
}
