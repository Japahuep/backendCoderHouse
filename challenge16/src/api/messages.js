import config from "../config.js";

import FileContainer from "../containers/FileContainer.js";
import { logger } from "../logger/winston.js";

const messagesApi = () => {
  try {
    const messages = new FileContainer(
      `${config.fileSystem.path}/messages.json`
    );
    return messages
  } catch (error) {
    logger.error("Mesagges API - " + error);
  }
};

export default messagesApi();
