import MongodbContainer from "../../containers/MongodbContainer.js"

class ProductsDaoMongodb extends MongodbContainer {

  constructor() {
    super('products', {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
      })
  }
}

export default ProductsDaoMongodb