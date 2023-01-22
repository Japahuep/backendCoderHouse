import nodemailer from "nodemailer";

const GMAIL_EMAIL = "sebastianmolinarojas@gmail.com";

const createSendMail = (mailConfig) => {
  const transporter = nodemailer.createTransport(mailConfig);
  const sendMail = (subject, htmlMessage) => {
    const mailOptions = {
      from: GMAIL_EMAIL,
      to: GMAIL_EMAIL,
      subject: subject,
      // text,
      html: htmlMessage,
    };
    return transporter.sendMail(mailOptions);
  };

  return sendMail;
};

const createSendMailGmail = () => {
  return createSendMail({
    service: "gmail",
    port: 587,
    auth: {
      user: GMAIL_EMAIL,
      pass: "twkdmhlojzbjlblg",
    },
  });
};

const sendMail = createSendMailGmail();

export default sendMail;
