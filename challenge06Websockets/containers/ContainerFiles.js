const { promises: fs } = require('fs');

class ContainerFiles {
  constructor(route) {
    this.route = route;
  }

  async listAll() {
    try {
      const elements = await fs.readFile(this.route, 'utf-8');
      return JSON.parse(elements);
    } catch (err) {
      return [];
    }
  }

  async save(element) {
    const elements = await this.listAll();
    elements.push(element);
    await fs.writeFile(this.route, JSON.stringify(elements));
  }

  async deleteAll() {
    const elements = [];
    console.log('nThe elements have been removed\n');
    await fs.writeFile(this.route, JSON.stringify(elements));
  }
}

module.exports = ContainerFiles;