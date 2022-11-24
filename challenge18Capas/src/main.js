import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import SqlContainer from './containers/SqlContainer.js'
import config from './config.js'

//--------------------------------------------
// Instancia servidor, socket y api
// Ejecutar makeTables.js (con node) y luego ejecutar main.js

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)


const productsApi = new SqlContainer(config.mariaDb, 'products')
const messagesApi = new SqlContainer(config.sqlite3, 'messages')
//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    //products  listAll - save
    console.log('New client connected');

    let products = await productsApi.listAll();
    socket.emit('products', products);

    socket.on('newProduct', async product => {
        await productsApi.save(product);
        products = await productsApi.listAll();
        io.sockets.emit('products', products);
    });

    //messages  listAll - save
    let messages = await messagesApi.listAll();
    socket.emit('messages', messages);

    socket.on('newMessage', async message => {
        await messagesApi.save(message);
        messages = await messagesApi.listAll();
        io.sockets.emit('messages', messages);
    })
});

//--------------------------------------------
// agrego middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


//--------------------------------------------
// inicio el servidor
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server http listening in the port ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Server error ${error}`))