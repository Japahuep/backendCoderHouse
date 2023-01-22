import { MessagesDaoDb } from "../models/daos/MessagesDaoDb.js";

import config from "../config/config.js";

const option = process.argv[2];

let dao;

switch (option) {
  default:
    const cnxStr = config.mongodb.host;
    dao = new MessagesDaoDb(cnxStr);
    await dao.init();
}

export default class MessagesDaoFactory {
  static getDao() {
    return dao;
  }
}
