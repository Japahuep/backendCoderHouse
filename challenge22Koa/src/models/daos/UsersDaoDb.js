import mongoose from "mongoose";
import { asUserDto } from "../dtos/UserDto.js";

const userSchema = new mongoose.Schema({
  id: { type: String },
  username: { type: String },
  password: { type: String },
  name: { type: String },
  address: { type: String },
  age: { type: Number },
  phone: { type: String },
  photo: { type: String },
  cart: { type: String },
});

export class UsersDaoDb {
  constructor(cnxStr) {
    this.cnxStr = cnxStr;
    this.users = mongoose.model("Users", userSchema);
  }

  async init() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(this.cnxStr);
    console.log("Users DAO in MongoDB -> Ready");
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log("Users DAO in MongoDB -> Closed");
  }

  async listAll() {
    const users = await this.users.find({});
    return asUserDto(users);
  }

  async list(id) {
    const user = await this.users.findOne({ id: id });
    return asUserDto(user);
  }

  async listByCat(cat) {
    const users = await this.users.find({ category: cat });
    return asUserDto(users);
  }

  async save(user) {
    const users = await this.listAll();
    let id;
    const length = users.length;
    if (length > 0) {
      id = parseInt(users[length - 1].id) + 1;
    } else {
      id = 0;
    }
    user.id = id.toString();
    const newUser = await this.users.create(user);
    return asUserDto(newUser);
  }

  async deleteAll() {
    await this.users.deleteMany({});
  }

  async delete(id) {
    const deletedUser = await this.users.findOneAndDelete({ id: id });
    return asUserDto(deletedUser);
  }

  async update(id, newData) {
    const updatedUser = await this.users.findOneAndUpdate(
      { id: id },
      { $set: newData },
      { returnDocument: "after" }
    );
    return asUserDto(updatedUser);
  }
}
