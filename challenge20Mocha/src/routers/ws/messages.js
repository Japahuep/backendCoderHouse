import MessagesRepos from "../../models/repos/MessagesRepos.js";
const messagesApi = new MessagesRepos();
import { normalizeMessages } from "../../utils/normalizr/messages.js";

export default async function addMessagesHandlers(socket, sockets) {
  let messages = await messagesApi.listAll();
  const visibleMessages = messages.map((message) => {
    const { author, fyh, text, id, timestamp } = message;
    return { author, fyh, text, id, timestamp };
  });
  let normalizedMessages = normalizeMessages(visibleMessages);
  socket.emit("messages", normalizedMessages);

  socket.on("newMessage", async (message) => {
    await messagesApi.add(message);
    messages = await messagesApi.listAll();
    const visibleMessages = messages.map((message) => {
      const { author, fyh, text, id, timestamp } = message;
      return { author, fyh, text, id, timestamp };
    });
    normalizedMessages = normalizeMessages(visibleMessages);
    sockets.emit("messages", normalizedMessages);
  });
}
