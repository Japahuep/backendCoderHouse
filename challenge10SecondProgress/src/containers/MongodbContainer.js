import mongoose from 'mongoose';
import config from '../config.js';

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class MongodbContainer {

    constructor(collName, schema) {
      this.coll = mongoose.model(collName, schema);
    }

    async list(id) {
      return await this.coll.find({id: {$eq: id}});
    }
    
    async listAll() {
      try {
        return await this.coll.find({});
      } catch (err) {
        return [];
      }
    }

    async save(element) {
      const elements = await this.listAll();
      console.log(elements);
      let id;
      const length = elements.length;
      if (length > 0) {
        id = elements.map(elem => parseInt(elem.id));
        id.sort((a,b) => b-a);
        id = (id[0] + 1).toString();
      } else {
        id = '1';
      }
      element.id = id;
      element.timestamp = Date.now()
      await this.coll.create(element);
    }

    async include(element, id) {
      const cart = await this.list(id);
      const products = cart[0].products;
      products.push(element);
      await this.coll.updateOne({id: {$eq: id}}, {$set: {products: products}});
    }

    async update(element, id) {
      const {title, price, thumbnail} = element;
      const timestamp = Date.now()
      return await this.coll.updateOne({id: {$eq: id}}, {$set: {title: title, price: price, thumbnail: thumbnail, timestamp: timestamp}});
    }

    async deleteById(id) {
      await this.coll.deleteOne({id: {$eq: id}});
    }

    async deleteAll() {
      await this.coll.deleteMany({});
    }

    async removeById(id, idElement) {
      const cart = await this.list(id);
      let products = cart[0].products;
      products = products.filter(element => element.id !== idElement);
      await this.coll.updateOne({id: {$eq: id}}, {$set: {products: products}});
    }
}

export default MongodbContainer;