import twilio from "twilio";

const accountSid = "AC1a1b3131bc59fd8b090d81842b75efcf";
const authToken = "a2e3d3622ce96fa698592ee0021be2d0";

const client = twilio(accountSid, authToken);

const sendWhatsapp = async (message) => {
  const options = {
    body: message,
    from: "whatsapp:+14155238886",
    to: "whatsapp:+56997452149",
  };

  try {
    const message = await client.messages.create(options);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

export default sendWhatsapp;
