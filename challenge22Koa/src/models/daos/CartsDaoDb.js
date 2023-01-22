import mongoose from "mongoose";
import { asCartDto } from "../dtos/CartDto.js";

const cartSchema = new mongoose.Schema({
  id: { type: String },
  email: { type: String },
  fyh: { type: String },
  products: { type: Array },
  address: { type: String },
  timestamp: { type: Number },
});

export class CartsDaoDb {
  constructor(cnxStr) {
    this.cnxStr = cnxStr;
    this.carts = mongoose.model("Carts", cartSchema);
  }

  async init() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(this.cnxStr);
    console.log("Carts DAO in MongoDB -> Ready");
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log("Carts DAO in MongoDB -> Closed");
  }

  async #list(id) {
    const cart = await this.carts.findOne({ id: id });
    console.log(cart);
    return asCartDto(cart);
  }

  async listAll() {
    const carts = await this.carts.find({});
    return asCartDto(carts);
  }

  async includeProd(id, prod) {
    console.log(await this.carts.find({}));
    console.log(id);
    console.log(prod);
    const cart = await this.#list(id);
    const products = cart.products;
    const prodId = prod.id;
    const prodIndex = products.map((prod) => prod.id).indexOf(prodId);
    if (prodIndex !== -1) {
      cart.products[prodIndex].qty++;
    } else {
      prod.qty = 1;
      cart.products.push(prod);
    }
    const updatedCart = await this.carts.findOneAndUpdate(
      { id: id },
      { $set: cart }
    );
    console.log(updatedCart);
    return asCartDto(cart);
  }

  async save(cart) {
    const carts = await this.listAll();
    let id;
    const length = carts.length;
    if (length > 0) {
      id = parseInt(carts[length - 1].id) + 1;
    } else {
      id = 0;
    }
    cart.id = id.toString();
    cart.timestamp = Date.now();
    const date = new Date();
    const fyh = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    cart.fyh = fyh;
    cart.products = [];
    await this.carts.create(cart);
    return asCartDto(cart);
  }

  async deleteAll() {
    await this.carts.deleteMany({});
  }

  async delete(id) {
    const deletedProduct = await this.carts.findOneAndDelete({ id: id });
    return asCartDto(deletedProduct);
  }

  async update(id, newData) {
    const updatedProduct = await this.carts.findOneAndUpdate(
      { id: id },
      { $set: newData }
    );
    return asCartDto(updatedProduct);
  }
}
