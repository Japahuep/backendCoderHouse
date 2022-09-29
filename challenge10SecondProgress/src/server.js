import express from 'express'
const { Router } = express

import {
  productsDao as productsApi,
  cartsDao as cartsApi,
} from './daos/index.js'

//------------------------------------------------------------------------
// instancio servidor

const app = express()

//--------------------------------------------
// permisos de administrador

const isAdmin = true

function noAdminErr(path, method) {
  const err = {
    err: -1,
  }
  if (path && method) {
    err.description = `path '${path}' method '${method}' unauthorized`
  } else {
    err.description = 'unauthorized'
  }
  return err
}

function onlyAdmins(req, res, next) {
  if (!isAdmin) {
    res.json(noAdminErr())
  } else {
    next()
  }
}

//--------------------------------------------
// configuro router de productos

const productsRouter = new Router()

productsRouter.get('/', async (req, res) => {
  console.log('HTTP GET');

  if (Object.entries(req.query).length > 0) {
    const id = req.query.id;
    res.json(await productsApi.list(id));
  } else {
    res.json(await productsApi.listAll());
  }
})

productsRouter.get('/:id', async (req, res) => {
    
})

productsRouter.post('/', onlyAdmins, async (req, res) => {
  console.log('HTTP POST');
  res.json(await productsApi.save(req.body));
})

productsRouter.put('/:id', onlyAdmins, async (req, res) => {
  console.log('HTTP PUT');
  const id = req.params.id;
  await productsApi.update(req.body, id);
  res.json(await productsApi.list(id));
})

productsRouter.delete('/:id', onlyAdmins, async (req, res) => {
  console.log('HTTP DELETE');
  const id = req.params.id;
  res.json(await productsApi.deleteById(id));
})

//--------------------------------------------
// configuro router de carritos

const cartsRouter = new Router()

cartsRouter.get('/', async (req, res) => {
    
})

cartsRouter.post('/', async (req, res) => {
  console.log('HTTP POST');
  res.json(await cartsApi.save(req.body));
})

cartsRouter.delete('/:id', async (req, res) => {
  console.log('HTTP DELETE');
  const id = req.params.id;
  res.json(await cartsApi.deleteById(id));
})

//--------------------------------------------------
// router de productos en carrito

cartsRouter.get('/:id/products', async (req, res) => {
  console.log('HTTP GET');
  const id = req.params.id;
  const cart = await cartsApi.list(id) 
  const products = cart[0].products
  res.json(products);
})

cartsRouter.post('/:id/products', async (req, res) => {
  console.log('HTTP POST');
  const id = req.params.id;
  console.log(id, "\n",req.body, "\n");
  res.json(await cartsApi.include(req.body, id));
})

cartsRouter.delete('/:id/products/:id_prod', async (req, res) => {
  console.log('HTTP DELETE');
  const id = req.params.id;
  const idElement = req.params.id_prod;
  res.json(await cartsApi.removeById(id, idElement));
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)

export default app