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
      element.timestamp = Date.now()
      await this.coll.insertOne(element);
    }

    async include(element, id) {


      // const elements = await this.listAll();
      // const index = elements.map(elementItem => elementItem.id).indexOf(id);
      // let container = elements[index];
      // let products = container.products
      // if (products) {
      //   products.push(element);
      // } else {
      //   container.products = [element];
      // }
      // await fs.writeFile(this.route, JSON.stringify(elements));
    }

    async update(element, id) {
      return await this.coll.updateOne({_id: {$eq: id}}, {$set: element});
    }

    async deleteById(id) {
      await this.coll.deleteOne({_id: {$eq: id}});
    }

    async deleteAll() {
      await this.coll.deleteMany({});
    }

    async removeById(id, idElement) {
      // const elements = await this.listAll();
      // const index = elements.map(elementItem => elementItem.id).indexOf(id);
      // let container = elements[index];
      // container.products = container.products.filter(element => element.id !== idElement);
      // await fs.writeFile(this.route, JSON.stringify(elements));
    }
}

export default MongodbContainer;