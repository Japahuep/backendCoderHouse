class CartDto {
  constructor({ id, email, fyh, products, address, timestamp }) {
    this.id = id;
    this.email = email;
    this.fyh = fyh;
    this.products = products;
    this.address = address;
    this.timestamp = timestamp;
  }
}

export const asCartDto = (cart) => {
  if (Array.isArray(cart)) {
    return cart.map((p) => new CartDto(p));
  } else {
    return new CartDto(cart);
  }
};
