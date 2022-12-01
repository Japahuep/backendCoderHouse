import { Router } from "express";
import { fork } from "child_process";
import config from "../../config.js";

const randomApiRouter = new Router();

randomApiRouter.get("/api/randoms", (req, res) => {
  const qty = parseInt(req.query.cant);
  const compute = fork("./src/childProcess/random.js");
  compute.send({ instruction: "start", qty: qty });
  compute.on("message", (numObject) => {
    console.log(`Listening on port ${config.server.PORT}`);
    res.end(`${JSON.stringify(numObject)}`);
  });
});

export default randomApiRouter;
