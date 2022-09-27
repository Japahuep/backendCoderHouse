import FirebaseContainer from "../../containers/FirebaseContainer.js"

class ProductsDaoFirebase extends FirebaseContainer {

  constructor() {
    super('products.json')
  }
}

export default ProductsDaoFirebase