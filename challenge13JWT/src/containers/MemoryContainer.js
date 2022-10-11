class MemoryContainer {
  constructor() {
    this.elements = [];
    this.id = 0;
  }

  list(id) {
    const element = this.elements.find(element => element.id === id);
    if (element) {
      return element;
    } else {
      return "Element not found"
    }
  }

  listAll() {
    return this.elements
  }

  save(element) {
    element.id = this.id;
    this.id++;
    this.elements.push(element);
    return this.elements;
  }

  update(element, id) {
    const pos = this.elements.map(element => element.id).indexOf(id);
    if (pos !== -1) {
      this.elements[pos].title = element.title;
      this.elements[pos].price = element.price;
      this.elements[pos].thumbnail = element.thumbnail;
    }
  }

  delete(id) {
    const exist = this.elements.map(element => element.id).indexOf(id);
    if (exist !== -1) {
      this.elements = this.elements.filter(element => element.id !== id);
      return `Element with id: ${id} deleted`
    } else {
      return "Element not found"
    }
  }

  deleteAll() {
    this.elements = [];
    return this.elements
  }
}

export default MemoryContainer;