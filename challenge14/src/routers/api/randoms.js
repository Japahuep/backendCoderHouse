import { Router } from "express";
import { fork } from "child_process";
import util from 'util';

const randomApiRouter = new Router();

randomApiRouter.get("/api/randoms", (req, res) => {
  const qty = parseInt(req.query.cant);
  const compute = fork("./src/childProcess/random.js");
  compute.send({ instruction: "start", qty: qty });
  compute.on("message", (numObject) => {
    res.end(`${JSON.stringify(numObject)}`);
  });
});

export default randomApiRouter;
