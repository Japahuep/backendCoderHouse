import { Context } from "../../deps.ts";
import logger from "../middlewares/logger.ts";
import { Color } from "../types/color.type.ts";

const DB_COLORS: Color[] = [];
DB_COLORS.push({ color: "yellow" });
DB_COLORS.push({ color: "red" });

export const findAll = (ctx: Context) => {
  try {
    ctx.response.status = 200;
    logger.debug(`status: ${ctx.response.status} method: findAll handler`);
    const colors = DB_COLORS.map((color) => color.color);
    ctx.render("colors.ejs", { length: colors.length, colors: colors });
  } catch (error) {
    ctx.response.status = 500;
    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { code: "99", msg: error };
  }
};

export const createColor = async (ctx: Context) => {
  try {
    ctx.response.status = 201;
    logger.debug(`status: ${ctx.response.status} method: createColor handler`);

    const data = await ctx.request.body().value;
    const color = data.get("color");
    const newColor: Color = {
      color: color,
    };

    DB_COLORS.push(newColor);
    ctx.response.redirect("/api/colors");
  } catch (error) {
    ctx.response.status = 500;
    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { code: "99", msg: error };
  }
};
