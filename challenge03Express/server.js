const products = require('../challenge02Files/containerGenerator');
const express = require('express');

const app = express();

const PORT = 8080;

app.get('/products', async (req, res) => {
  let productList = await products.getAll();
  res.send(productList);
});

app.get('/randomProduct', async (req, res) => {
  let productList = await products.getAll();
  length = productList.length;
  id = Math.floor(Math.random()*length)+1
  let productId = await products.getById(id);
  res.send(productId);
});

const server = app.listen(PORT, () => {
  console.log(`Server http listening in the port ${server.address().port}`);
});

server.on('error', err => console.log(`Error in server ${err}`));