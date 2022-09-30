import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class FirebaseContainer {

    constructor(collName) {
      this.coll = db.collection(collName);
      this.id = 0;
    }

    async list(id) {
      try {
        const doc = this.coll.doc(`${id}`);
        const item = await doc.get();
        const res = item.data();
        return res;
      } catch (err) {
        console.log(err);
      }
    }
    
    async listAll() {
      try {
        const querySnapshot = await this.coll.get();
        let docs = querySnapshot.docs;
        const res = docs.map(doc => ({
          ...doc.data()
        }))
        return res;
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
        console.log(id);
        id = (id[0] + 1).toString();
        console.log(id);
      } else {
        id = '1';
      }
      element.id = id;
      element.timestamp = Date.now()
      try {
        let doc = this.coll.doc(`${id}`);
        await doc.create(element);
      } catch (err) {
        console.log(err);
      }
    }

    async include(element, id) {
      const cart = await this.list(id);
      console.log(cart);
      const products = cart.products;
      
      products.push(element);
      const doc = this.coll.doc(`${id}`);
      await doc.update({products: products});
    }

    async update(element, id) {
      const {title, price, thumbnail} = element;
      const timestamp = Date.now()
      try {
        const doc = this.coll.doc(`${id}`);
        await doc.update({title: title, price: price, thumbnail: thumbnail, timestamp: timestamp});
      } catch (err) {
        console.log(err);
      }
    }

    async deleteById(id) {
      try {
        const doc = this.coll.doc(`${id}`);
        await doc.delete();
      } catch (err) {
        console.log(err);
      }
    }
    
    async deleteAll() {
      const documents = await this.coll.listDocuments();
      documents.map(doc => doc.delete());
    }

    async removeById(id, idElement) {
      try {
        const cart = await this.list(id);
        let products = cart.products;
        products = products.filter(element => element.id !== idElement);
        const doc = this.coll.doc(`${id}`);
        await doc.update({products: products});
      } catch (err) {
        console.log(err);
      }
    }
}

export default FirebaseContainer;