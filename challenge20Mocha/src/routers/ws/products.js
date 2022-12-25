import ProductsRepos from "../../models/repos/ProductsRepos.js";
const productsApi = new ProductsRepos();

export default async function addProductsHandlers(socket, sockets) {
  let products = await productsApi.listAll();
  const visibleProduct = products.map((product) => {
    const {title, price, thumbnail} = product
    return {title, price, thumbnail}
  });
  socket.emit("products", visibleProduct);

  socket.on("newProduct", async (product) => {
    await productsApi.add(product);
    products = await productsApi.listAll();
    const visibleProduct = products.map((product) => {
      const {title, price, thumbnail} = product
      return {title, price, thumbnail}
    });
    sockets.emit("products", visibleProduct);
  });
}
