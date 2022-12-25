import { MessagesDaoDb } from "../models/daos/MessagesDaoDb.js";
import { MessagesDaoFile } from "../models/daos/MessagesDaoFile.js";
import { MessagesDaoMemory } from "../models/daos/MessagesDaoMemory.js";
import { MessagesDaoSql } from "../models/daos/MessagesDaoSql.js";

import config from "../config/config.js";

const option = process.argv[2] || "Mem";

let dao;

switch (option) {
  case "Mongo":
    const cnxStr = config.mongodb.host;
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
