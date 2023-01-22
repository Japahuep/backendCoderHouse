import path from "path";
import { postSignup } from "../services/auth.service.js";
const __dirname = path.resolve();

let sessionName;

const getLoginController = async (ctx) => {
  if (ctx.request) {
    ctx.session.userName = ctx.request.user.username;
    res.redirect("/home");
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
};

const postLoginController = async (ctx) => {
  const user = ctx.request.body;
  // sessionName = user.name;
  ctx.session.user = user;
  ctx.body = {};
};

const getFailLoginController = async (ctx) => {
  console.log("Login error");
  await ctx.logout((err) => {
    if (err) {
      return next(err);
    }
    ctx.session = null;
    res.render(path.join(__dirname + "/views/pages/login-error"), {});
  });
};

const getSignupController = async (ctx) => {
  res.sendFile(path.join(__dirname + "/views/signup.html"));
};

const postSignUpController = async (ctx) => {
  const user = ctx.request.body;
  cyx.session.user = user.name;
  sessionName = user.name;
  const uri = await postSignup(user);

  res.redirect(uri);
};

const getFailSignUpController = async (ctx) => {
  console.log("Signup error");
  res.render(path.join(__dirname + "/views/pages/signup-error.ejs"), {});
};

const getLogoutController = async (ctx) => {
  ctx.session.destroy((err) => {
    if (err) {
      res.json({ status: "Logout error", body: err });
    } else {
      res.render(path.join(__dirname + "/views/pages/logout.ejs"), {
        sessionName,
      });
    }
  });
};

export {
  getLoginController,
  postLoginController,
  getFailLoginController,
  getSignupController,
  postSignUpController,
  getFailSignUpController,
  getLogoutController,
};
