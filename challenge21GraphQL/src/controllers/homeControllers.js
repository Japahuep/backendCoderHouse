import path from "path";
const __dirname = path.resolve();

const getMainController = async (req, res) => {
  res.send("Express server ready");
};

const getHomeController = async (req, res) => {
  if (req.session.userName) {
    res.render(path.join(__dirname + "/views/pages/home.ejs"), {
      userName: req.session.userName,
    });
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
};

const getProductTestController = async (req, res) => {
  res.sendFile(path.join(__dirname + "/views/products-test-view.html"));
};

export { getMainController, getHomeController, getProductTestController };
