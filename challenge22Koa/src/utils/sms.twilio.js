import twilio from "twilio";

const accountSid = "AC1a1b3131bc59fd8b090d81842b75efcf";
const authToken = "a2e3d3622ce96fa698592ee0021be2d0";
const fromPhoneNumber = "+14248668307";

const client = twilio(accountSid, authToken);

const sendSMS = async (number) => {
  const options = {
    body: "Tu pedido ha sido recibido y se encuentra en proceso.",
    from: fromPhoneNumber,
    to: number,
  };

  try {
    const message = await client.messages.create(options);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

export default sendSMS;
