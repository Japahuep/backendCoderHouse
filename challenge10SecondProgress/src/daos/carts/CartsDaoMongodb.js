import MongodbContainer from "../../containers/MongodbContainer.js"

class CartsDaoMongodb extends MongodbContainer {

  constructor() {
    super('carts', {
      timestamp: {type: Number, required: true},
      id: {type: String, required: true},
      products: { type: []},
    })
  }

  async save(cart = { products: [] }) {
    return super.save(cart)
  }
}

export default CartsDaoMongodb