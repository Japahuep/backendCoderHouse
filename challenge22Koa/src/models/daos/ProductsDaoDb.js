import mongoose from "mongoose";
import { asProductDto } from "../dtos/ProductDto.js";

const productSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  price: { type: Number },
  thumbnail: { type: String },
  category: { type: String },
  timestamp: { type: Number },
});

export class ProductsDaoDb {
  constructor(cnxStr) {
    this.cnxStr = cnxStr;
    this.products = mongoose.model("Products", productSchema);
  }

  async init() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(this.cnxStr);
    console.log("Products DAO in MongoDB -> Ready");
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log("Products DAO in MongoDB -> Closed");
  }

  async listAll() {
    const products = await this.products.find({});
    return asProductDto(products);
  }

  async list(id) {
    const product = await this.products.findOne({ id: id });
    return asProductDto(product);
  }

  async listByCat(cat) {
    const products = await this.products.find({ category: cat });
    return asProductDto(products);
  }

  async save(product) {
    const products = await this.listAll();
    let id;
    const length = products.length;
    if (length > 0) {
      id = parseInt(products[length - 1].id) + 1;
    } else {
      id = 0;
    }
    product.id = id.toString();
    product.timestamp = Date.now();
    await this.products.create(product);
    return asProductDto(product);
  }

  async deleteAll() {
    await this.products.deleteMany({});
  }

  async delete(id) {
    const deletedProduct = await this.products.findOneAndDelete({ id: id });
    return asProductDto(deletedProduct);
  }

  async update(id, newData) {
    const updatedProduct = await this.products.findOneAndUpdate(
      { id: id },
      { $set: newData }
    );
    return asProductDto(updatedProduct);
  }
}
