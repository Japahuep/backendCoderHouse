import FirebaseContainer from "../../containers/FirebaseContainer.js"

class CartsDaoFirebase extends FirebaseContainer {

  constructor() {
    super('carts.json')
  }

  async save(cart = { products: [] }) {
    return super.save(cart)
  }
}

export default CartsDaoFirebase