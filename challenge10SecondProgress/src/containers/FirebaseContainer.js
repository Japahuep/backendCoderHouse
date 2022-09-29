import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class FirebaseContainer {

    constructor(collName) {
      this.coll = db.collection(collName);
    }

    async list(id) {
      try {
        
      } catch (err) {
        console.log(err);
      }
      return await this.coll.find({id: {$eq: id}});
    }
    
    async listAll() {
      try {
        const querySnapshot = await query.get();
        console.log(querySnapshot);
        // return await this.coll.find({});
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
        id = (parseInt(elements[length-1].id) + 1).toString();
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

export default FirebaseContainer;