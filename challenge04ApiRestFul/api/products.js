class ProductsApi {
  constructor() {
      this.products = []
      this.id = 0
  }

  getById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        return "Product not found"
      }
  }

  getAll() {
      return this.products;
  }

  save(product) {    
    product.id = this.id;
    this.id++;
    this.products.push(product);
    return product;
  }

  update(product, id) {
    const pos = this.products.map(product => product.id).indexOf(id);
    if (pos !== -1) {
      this.products[pos].title = product.title;
      this.products[pos].price = product.price;
      this.products[pos].thumbnail = product.thumbnail;
    }
  }

  deleteById(id) {
    const exist = this.products.map(product => product.id).indexOf(id);
    if (exist !== -1) {
      this.products = this.products.filter(product => product.id !== id);
      return `Product with id: ${id} deleted`
    } else {
      return "Product not found"
    }
  }
}

module.exports = ProductsApi;