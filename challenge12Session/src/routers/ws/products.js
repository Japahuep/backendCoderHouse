import productsApi from "../../api/products.js";

export default async function addProductsHandlers(socket, sockets) {
  let products = await productsApi.listAll();
  socket.emit("products", products);

  socket.on("newProduct", async (product) => {
    await productsApi.save(product);
    products = await productsApi.listAll();
    sockets.emit("products", products);
  });
}
