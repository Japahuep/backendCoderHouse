const express = require('express')
const { Router } = express
const ProductsApi = require('./api/products.js')

//Router
const productsApi = new ProductsApi()
const productsRouter = new Router()

productsRouter.use(express.json())
productsRouter.use(express.urlencoded({ extended: true }))

productsRouter.get('/', (req, res) => {
  console.log('HTTP GET');
  res.json(productsApi.getAll());
});

productsRouter.get('/:id', (req, res) => {
  console.log('HTTP GET');
  const id = parseInt(req.params.id);
  res.json(productsApi.getById(id));
})

productsRouter.post('/', (req, res) => {
  console.log('HTTP POST');
  const product = productsApi.save(req.body);
  res.json(product);
})

productsRouter.put('/:id', (req, res) => {
  console.log('HTTP PUT');
  const id = parseInt(req.params.id);
  productsApi.update(req.body, id);
  res.json(productsApi.getById(id));
})

productsRouter.delete('/:id', (req, res) => {
  console.log('HTTP DELETE');
  const id = parseInt(req.params.id);
  res.json(productsApi.deleteById(id));
})

// Server
const app = express()
app.use(express.static('public'))
app.use('/api/products', productsRouter)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server http listening in the port ${server.address().port}`)
})
server.on("error", error => console.log(`Server error ${error}`))