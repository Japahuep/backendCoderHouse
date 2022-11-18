// import { faker } from "@faker-js/faker";
// import { faker } from '@faker-js/faker/locale/de'

function createNFakeProducts(n) {
  const objs = [];
  for (let i = 0; i < n; i++) {
    objs.push(createFakeProduct(i));
  }
  return objs;
}

function createFakeProduct(id) {
  return {
    // title: faker.commerce.product(),
    // price: faker.commerce.price(),
    // thumbnail: faker.image.imageUrl(),
    id: id,
  };
}

export { createFakeProduct, createNFakeProducts };
