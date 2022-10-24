import messagesApi from "../../api/messages.js";
import { normalizeMessages } from "../../normalizr/index.js";

export default async function addMessagesHandlers(socket, sockets) {
  let messages = await messagesApi.listAll();
  let normalizedMessages = normalizeMessages(messages);
  socket.emit("messages", normalizedMessages);
  socket.on("newMessage", async (message) => {
    await messagesApi.save(message);
    messages = await messagesApi.listAll();
    normalizedMessages = normalizeMessages(messages);
    sockets.emit("messages", normalizedMessages);
  });
}
