import path from "path";
const __dirname = path.resolve();

let sessionName;

const getLoginController = async (req, res) => {
  if (req.isAuthenticated()) {
    req.session.userName = req.user.username;
    res.redirect("/home");
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
};
const postLoginController = async (req, res) => {
  const user = req.user;
  console.log(user);
  req.session.userName = req.body.username;
  sessionName = req.session.userName;
  res.redirect("/home");
};
const getFailLoginController = async (req, res) => {
  console.log("Login error");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render(path.join(__dirname + "/views/pages/login-error"), {});
  });
};
const getSignupController = async (req, res) => {
  res.sendFile(path.join(__dirname + "/views/signup.html"));
};
const postSignUpController = async (req, res) => {
  const user = req.user;
  console.log(user);  
  res.sendFile(path.join(__dirname + "/views/login.html"));
};
const getFailSignUpController = async (req, res) => {
  console.log("Signup error");

  res.render(path.join(__dirname + "/views/pages/signup-error"), {});
};
const getLogoutController = async (req, res) => {
  req.session.destroy((err) => {
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
