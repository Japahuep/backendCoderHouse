import { Router } from "../../deps.ts";
import { findAll, createColor } from "../handlers/colors.handlers.ts";

export const colorRouter = new Router({ prefix: "/api" })
  .get("/colors", findAll)
  .post("/colors", createColor);
