const socket = io.connect();

//------------------------------------------------------------------------------------

const formSaveProduct = document.getElementById('formSaveProduct');
formSaveProduct.addEventListener('submit', e => {
  e.preventDefault();
  //Armar objeto producto y emitir mensaje a evento update
  //Armar el objeto de producto con los keys que va a tener nuestro producto
  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };
  //Hacer un socket.emit
  socket.emit('newProduct', product);
})

socket.on('products', async products => {
  //generar el html y colocarlo en el tag productos llamando a la función makeHtmlTable
    //Llamamos a la función makeHtmlTable
    const productHtml = await makeHtmlTable(products);
    //Hacer el innerHtml y reemplazar por un valor HTML
    document.getElementById('products').innerHTML = productHtml;
});

function makeHtmlTable(products) {
  return fetch('templates/productsTable.hbs')
    .then(res => res.text())
    .then(tpl => {
      const template = Handlebars.compile(tpl);
      const html = template({ products });
      return html;
    });
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername');
const inputMessage = document.getElementById('inputMessage');
const btnSend = document.getElementById('btnSend');

const formPostMessage = document.getElementById('formPostMessage');
formPostMessage.addEventListener('submit', e => {
  e.preventDefault();
  //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
  const date = new Date;
  const fyh = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  const message = {
    inputUsername: inputUsername.value,
    inputMessage: inputMessage.value,
    fyh: fyh,
  };

  socket.emit('newMessage', message);

  formPostMessage.reset();
  inputMessage.focus();
});

socket.on('messages', messages => {
  console.log(messages);
  const messageHtml = makeHtmlList(messages);
  document.getElementById('messages').innerHTML = messageHtml;
});

function makeHtmlList(messages) {
  //Armar nuestro html para mostrar los mensajes como lo hicimos en clase
  const html = messages.map(message => {
    return(`<div><strong>${message.inputUsername}</strong> <span>[${message.fyh}]</span>: <em>${message.inputMessage}</em></div>`)
  }).join("");
  return html;
}

inputUsername.addEventListener('input', () => {
  const existEmail = inputUsername.value.length;
  const existText = inputMessage.value.length;
  inputMessage.disabled = !existEmail;
  btnSend.disabled = !existEmail || !existText;
});

inputMessage.addEventListener('input', () => {
  const existText = inputMessage.value.length;
  btnSend.disabled = !existText;
});