import { Application } from "./deps.ts";
import { config } from "./deps.ts";
import { colorRouter } from "./src/routes/colors.routes.ts";

import { viewEngine, dejsEngine, oakAdapter } from "./deps.ts";

const app = new Application();

app.use(viewEngine(oakAdapter, dejsEngine, { viewRoot: "./views" }));

app.use(colorRouter.routes());
app.use(colorRouter.allowedMethods());

const { PORT } = config();
app.listen({ port: Number(PORT) });
console.log(`Server running on PORT:${PORT}`);
