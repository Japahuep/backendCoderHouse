import ProductsRepos from "../models/repos/ProductsRepos.js";
const productsApi = new ProductsRepos();

export default async function addProductsHandlers(socket, sockets) {
  let products = await productsApi.listAll();
  const visibleProduct = products.map((product) => {
    const { id, title, price, thumbnail, category, timestamp } = product;
    return { id, title, price, thumbnail, category, timestamp };
  });
  socket.emit("products", visibleProduct);

  socket.on("newProduct", async (product) => {
    await productsApi.add(product);
    products = await productsApi.listAll();
    const visibleProduct = products.map((product) => {
      const { id, title, price, thumbnail, category, timestamp } = product;
      return { id, title, price, thumbnail, category, timestamp };
    });
    sockets.emit("products", visibleProduct);
  });
}
