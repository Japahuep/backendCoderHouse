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

const infoLogger = (ctx, next) => {
  logger.info(`Path: '${ctx.request.url}' & Method: '${ctx.reques.method}'`);
  next();
};

export { logger, infoLogger };
