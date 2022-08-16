const express = require('express');
const handlebars = require('express-handlebars');

const ProductsApi = require('../api/products.js');

const productsApi = new ProductsApi();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Set engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'view.hbs',
    layoutsDir: './views',
  })
);

app.set('views', './views');
app.set('view engine', 'hbs');

//--------------------------------------------
let listCond = false;
app.get('/products', (req, res) => {
  console.log('HTTP GET');
  let products = productsApi.getAll();
  listCond = products.length > 0 ? true:false;
  res.render('view', { products, listExist: listCond });
});

app.post('/products', (req, res) => {
  console.log('HTTP POST');
  productsApi.save(req.body);
  res.redirect('products');
});

//--------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server http listening in the port ${server.address().port}`)
})
server.on("error", error => console.log(`Server error ${error}`))