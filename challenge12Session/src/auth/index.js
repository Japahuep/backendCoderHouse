export function webAuth(req, res, next) {
  if (!req) {
    res.json("Error");
  } else {
    next();
  }
}

export function apiAuth(req, res, next) {}
