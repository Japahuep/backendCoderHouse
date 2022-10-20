export function webAuth(req, res, next) {
  if (req) {
    next();
  } else {
    res.redirect("/login");
  }
}

export function apiAuth(req, res, next) {}
