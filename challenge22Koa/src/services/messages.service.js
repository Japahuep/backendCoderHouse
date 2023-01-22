import MessagesRepo from "../models/repos/MessagesRepos.js";
const messages = new MessagesRepo();

const objectsPrinter = (objs) => {
  let printableData;
  if (Array.isArray(objs)) {
    printableData = objs.map((obj) => {
      const { id, author, text, fyh, timestamp } = obj;
      return { id, author, text, fyh, timestamp };
    });
  } else {
    const { id, author, text, fyh, timestamp } = objs;
    printableData = { id, author, text, fyh, timestamp };
  }
  return printableData;
};

const getMsgs = async () => {
  let data = await messages.listAll();
  data = objectsPrinter(data);
  return data;
};

const getMsgByAuthor = async (auth) => {
  let data = await messages.listByAuthor(auth);
  data = objectsPrinter(data);
  return data;
};

const postMsgs = async (prod) => {
  const data = await messages.add(prod);
  return data;
};

export { getMsgs, getMsgByAuthor, postMsgs };
