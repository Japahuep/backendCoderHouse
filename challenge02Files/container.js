const { promises: fs } = require('fs');

class Container {
  constructor(path) {
    this.path = path;
    this.defaultId = 1;
  }

  async save(product) {
    const products = await this.getAll();
    
    let index = products.map(productItem => productItem.title).indexOf(product.title);
    
    if (index !== -1) {
      products[index].price = product.price;
    } else {
      const actualId = products.map(productItem => productItem.id);
      while (actualId.includes(this.defaultId)) {
        this.defaultId++;
      }
      product.id = this.defaultId;
      this.defaultId++;
      products.push(product);
    }
    await fs.writeFile(this.path, JSON.stringify(products));
  }

  async getById(id) {
    const products = await this.getAll();
    const product = products.find(product => product.id === id);
    return product;
  }

  async getAll() {
    try {
      const products = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(products);
    } catch (err) {
      return [];
    }
  }

  async deleteById(id) {
    const products = await this.getAll();
    const updatedProducts = products.filter(product => product.id !== id);
    console.log(`\nThe product with id: ${id} have been removed\n`)
    this.defaultId = 1;
    await fs.writeFile(this.path, JSON.stringify(updatedProducts));
  }

  async deleteAll() {
    const products = [];
    console.log(`\nThe products have been removed\n`)
    this.defaultId = 1;
    await fs.writeFile(this.path, JSON.stringify(products));
  }
}

module.exports = Container;