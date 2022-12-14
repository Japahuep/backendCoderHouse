import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "warn.log",
      level: "warn",
      dirname: "./logs",
    }),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      dirname: "./logs",
    }),
  ],
});

const infoLogger = (req, res, next) => {
  logger.info(`Path: '${req.url}' & Method: '${req.method}'`);
  next();
};

export { logger, infoLogger };
