import FirebaseContainer from "../../containers/FirebaseContainer.js"

class CartsDaoFirebase extends FirebaseContainer {

  constructor() {
    super('carts')
  }

  async save(cart) {
    cart.products = []
    return super.save(cart)
  }
}

export default CartsDaoFirebase