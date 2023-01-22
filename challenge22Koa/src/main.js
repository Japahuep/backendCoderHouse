/*=========================[Modules]=========================*/
import app from "./server.js";
import cluster from "cluster";
import { cpus } from "os";
const numCpu = cpus().length;

import config from "./config/config.js";

/*==========================[Server]=========================*/

if (cluster.isPrimary && config.server.MODE === "CLUSTER") {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Work ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const PORT = config.server.PORT || 3000;
  app.listen(PORT, (err) => {
    if (err) return console.log(`Server error ${err}`);
    console.log(
      `Server [${config.server.NODE_ENV}] http running on port ${PORT} - PID ${process.pid}`
    );
  });
}
