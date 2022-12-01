import config from "../config.js";

import FileContainer from "../containers/FileContainer.js";
import { logger } from "../logger/winston.js";

const productsApi = () => {
  try {
    const products = new FileContainer(
      `${config.fileSystem.path}/products.json`
    );
    return products;
  } catch (error) {
    logger.error("Products API - " + error);
  }
};

export default productsApi();
