class MessageDto {
  constructor({ author, text, fyh, id, timestamp }) {
    this.author = author;
    this.text = text;
    this.fyh = fyh;
    this.id = id;
    this.timestamp = timestamp;
  }
}

export const asMessageDto = (message) => {
  if (Array.isArray(message)) {
    return message.map((m) => new MessageDto(m));
  } else {
    return new MessageDto(message);
  }
};
