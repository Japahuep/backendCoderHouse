import mongoose from "mongoose";

let dataBaseConected = false;

export function conectDB(url, options, cb) {
  mongoose.set("strictQuery", false);
  mongoose.connect(url, options, (err) => {
    if (!err) {
      dataBaseConected = true;
    }
    if (cb != null) {
      cb(err);
    }
  });
}
