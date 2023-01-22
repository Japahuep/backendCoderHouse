import path from "path";
const __dirname = path.resolve();

const getMainController = async (ctx) => {
  ctx.response.redirect("/home");
};

const getHomeController = async (ctx) => {
  if (ctx.session.user) {
    res.render(path.join(__dirname + "/views/pages/home.ejs"), {
      userName: ctx.session.user.name,
      thumbnail: ctx.session.user.photo,
    });
  } else {
    ctx.response.sendFile(path.join(__dirname + "/views/login.html"));
  }
};

const getProductTestController = async (ctx) => {
  ctx.response.sendFile(
    path.join(__dirname + "/views/products-test-view.html")
  );
};

export { getMainController, getHomeController, getProductTestController };
