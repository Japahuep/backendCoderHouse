import mongoose from "mongoose";

let dataBaseConected = false;

export function conectDB(url, cb) {
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) {
        dataBaseConected = true;
      }
      if (cb != null) {
        cb(err);
      }
    }
  );
}
