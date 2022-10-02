import express from 'express';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

// import MemoryContainer from './containers/MemoryContainer.js';
import FileContainer from './containers/FileContainer.js';
import config from './config.js';

import { faker } from '@faker-js/faker';

import { normalize, schema } from "normalizr";

//--------------------------------------------
// Instancia servidor, socket y api
const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

// const productsApi = new MemoryContainer();
const messagesApi = new FileContainer(`${config.fileSystem.path}/messages.json`);

//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES
  // Definimos un esquema de autor
  const author = new schema.Entity('authors',{},{idAttribute:"email"});

  // Definimos un esquema de mensaje
  const message = new schema.Entity('text', {
    author: author
  });

  // Definimos un esquema de posts
  const post = new schema.Entity('posts', {
    messages: [message]
  })

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
  //products  listAll - save
  console.log('New client connected');

  // let products = productsApi.listAll();
  // socket.emit('products', products);

  // socket.on('newProduct', product => {
  //   productsApi.save(product);
  //   products = productsApi.listAll();
  //   io.sockets.emit('products', products);
  // });
  
  //messages  listAll - save
  let messages = await listNormalizedMessages();
  socket.emit('messages', messages);
  socket.on('newMessage', async message => {
    await messagesApi.save(message);
    messages = await listNormalizedMessages();
    io.sockets.emit('messages', messages);
  })
});

const listNormalizedMessages =  async () => {
  let messages = await messagesApi.listAll();
  messages = {
    id: "messages",
    messages: messages
  };
  return normalize(messages, post)
}

//--------------------------------------------
// agrego middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------

const createRandomObj = () => {
return {
  title: faker.commerce.product(),
  price: faker.commerce.price(),
  thumbnail: faker.image.imageUrl(),
}
}

app.get('/api/products-test', (req, res) => {
  const objs = [];
  for (let i = 0; i < 5; i++) {
    objs.push(createRandomObj());
  };
  res.json(objs);
})
//--------------------------------------------
// inicio el servidor
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server http listening in the port ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Server error ${error}`))