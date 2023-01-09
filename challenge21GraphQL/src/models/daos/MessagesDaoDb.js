import mongoose from "mongoose";
import { asMessageDto } from "../dtos/MessageDto.js";

const messageSchema = new mongoose.Schema({
  id: { type: String },
  author: { type: Object },
  text: { type: String },
  fyh: { type: String },
  timestamp: { type: Number },
});

export class MessagesDaoDb {
  constructor(cnxStr) {
    this.cnxStr = cnxStr;
    this.messages = mongoose.model("Messages", messageSchema);
  }

  async init() {
    mongoose.set("strictQuery", false);
    mongoose.connect(this.cnxStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Messages DAO in MongoDB -> Ready");
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log("Messages DAO in MongoDB -> Closed");
  }

  async listAll() {
    const messages = await this.messages.find({});
    return asMessageDto(messages);
  }

  async list(id) {
    const message = await this.messages.findOne({ id: id });
    return asMessageDto(message);
  }

  async save(message) {
    const messages = await this.listAll();
    let id;
    const length = messages.length;
    if (length > 0) {
      id = parseInt(messages[length - 1].id) + 1;
    } else {
      id = 0;
    }
    message.id = id.toString();
    message.timestamp = Date.now();

    await this.messages.create(message);
    return asMessageDto(message);
  }

  async delete(id) {
    const deletedMessage = await this.messages.findOneAndDelete({ id: id });
    return asMessageDto(deletedMessage);
  }

  async deleteAll() {
    await this.messages.deleteMany({});
  }

  async update(id, newData) {
    const updatedMessage = await this.messages.findOneAndUpdate(
      { id: id },
      { $set: newData }
    );
    return asMessageDto(updatedMessage);
  }
}
