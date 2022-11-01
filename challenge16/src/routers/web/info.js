import { Router } from "express";
import { webAuth } from "../../auth/index.js";
import { cpus } from "os";
import compression from "compression";

import path from "path";
const __dirname = path.resolve();
const infoWebRouter = new Router();

const enviromentVariablesFn = () => {
  const inputs = [];
  for (let i = 2; i < process.argv.length; i++) {
    inputs.push(process.argv[i]);
  }
  return inputs;
};
const enviromentVariables = enviromentVariablesFn();
const currentDirectory = process.cwd();
const processId = process.pid;
const nodeVersion = process.version;
const proccesTitle = process.title;
const operatingSystem = process.platform;
const memory = process.memoryUsage().rss;
const numCpu = cpus().length;
const info = {
  enviromentVariables,
  operatingSystem,
  nodeVersion,
  memory,
  proccesTitle,
  processId,
  currentDirectory,
  numCpu,
};

infoWebRouter.get("/info", webAuth, (req, res) => {
  // console.log(info);
  res.render(path.join(__dirname + "/views/pages/info.ejs"), info);
});

infoWebRouter.get("/compressed-info", compression(), (req, res) => {
  res.render(path.join(__dirname + "/views/pages/info.ejs"), {
    enviromentVariables,
    operatingSystem,
    nodeVersion,
    memory,
    proccesTitle,
    processId,
    currentDirectory,
    numCpu,
  });
});

export default infoWebRouter;
