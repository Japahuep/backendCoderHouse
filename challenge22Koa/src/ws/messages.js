import { normalizeMessages } from "../utils/messages.normalizr.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export default async function addMessagesHandlers(socket, sockets) {
  let messages = await fetch(
    `http://localhost:${process.env.PORT}/api/messages`
  ).then((response) => response.json().then((obj) => obj.data));
  const visibleMessages = messages.map((message) => {
    const { author, fyh, text, id, timestamp } = message;
    return { author, fyh, text, id, timestamp };
  });
  let normalizedMessages = normalizeMessages(visibleMessages);
  socket.emit("messages", normalizedMessages);

  socket.on("newMessage", async (message) => {
    await fetch(`http://localhost:${process.env.PORT}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    let messages = await fetch(
      `http://localhost:${process.env.PORT}/api/messages`
    ).then((response) => response.json().then((obj) => obj.data));

    const visibleMessages = messages.map((message) => {
      const { author, fyh, text, id, timestamp } = message;
      return { author, fyh, text, id, timestamp };
    });
    normalizedMessages = normalizeMessages(visibleMessages);
    sockets.emit("messages", normalizedMessages);
  });
}
