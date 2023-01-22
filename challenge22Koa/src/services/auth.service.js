import sendMail from "../utils/mail.nodemailer.js";
import fetch from "node-fetch";

const postSignup = async (user) => {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/api/user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    }
  );
  const uri =
    response === "http://localhost:${process.env.PORT}/api/user"
      ? "/login"
      : "/failsignup";

  if (uri === "/login") {
    await sendMail("New registration", `${user}`);
  }
  return uri;
};

export { postSignup };
