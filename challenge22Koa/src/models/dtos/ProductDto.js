class ProductDto {
  constructor({ title, price, thumbnail, category, id, timestamp }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.category = category;
    this.timestamp = timestamp;
  }
}

export const asProductDto = (product) => {
  if (Array.isArray(product)) {
    return product.map((p) => new ProductDto(p));
  } else {
    return new ProductDto(product);
  }
};
