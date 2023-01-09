// Repos
import MessagesRepo from "../models/repos/MessagesRepos.js";
const messagesApi = new MessagesRepo();

const qryMessages = () => {
  return messagesApi.listAll();
};

const qryMessage = (id) => {
  return messagesApi.list(id);
};

const createMessage = ({ data }) => {
  return messagesApi.add(data);
};

const updateMessage = ({ id, data }) => {
  return messagesApi.modify(id, data);
};

const deleteMessage = ({ id }) => {
  return messagesApi.remove(id);
};

export { qryMessages, qryMessage, createMessage, updateMessage, deleteMessage };
