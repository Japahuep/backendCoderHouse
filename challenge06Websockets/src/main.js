const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const ContainerFiles = require('../containers/ContainerFiles.js');
const ContainerMemory = require('../containers/ContainerMemory.js');

//--------------------------------------------
// instancia servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messagesFile = new ContainerFiles('./containers/messages.txt');
const productsApi = new ContainerMemory();
//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
  //products  listAll - save
  console.log('New client connected');

  let products = productsApi.listAll();
  socket.emit('products', products);

  socket.on('newProduct', product => {
    productsApi.save(product);
    io.sockets.emit('products', products);
  });

  //messages  listAll - save
  
  let messages = await messagesFile.listAll();
  socket.emit('messages', messages);

  socket.on('newMessage', async message => {
    await messagesFile.save(message);
    messages = await messagesFile.listAll();
    io.sockets.emit('messages', messages);
  });
});

//--------------------------------------------
// agrego middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//--------------------------------------------
// inicio el servidor

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Server http listening in the port ${connectedServer.address().port}`)
});

connectedServer.on('error', err => console.log(`Server error ${err}`));