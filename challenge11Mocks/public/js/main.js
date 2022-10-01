import { denormalize, schema } from "normalizr";

const socket = io.connect();

//------------------------------------------------------------------------------------

const formSaveProduct = document.getElementById('formSaveProduct')
formSaveProduct.addEventListener('submit', e => {
    e.preventDefault()
    const product = {
        title: formSaveProduct[0].value,
        price: formSaveProduct[1].value,
        thumbnail: formSaveProduct[2].value
    }
    socket.emit('newProduct', product);
    formSaveProduct.reset()
})

socket.on('products', products => {
    makeHtmlTable(products).then(html => {
        document.getElementById('products').innerHTML = html
    })
});

function makeHtmlTable(products) {
    return fetch('templates/productsTable.hbs')
        .then(res => res.text())
        .then(tpl => {
            const template = Handlebars.compile(tpl);
            const html = template({ products })
            return html
        })
}

//-------------------------------------------------------------------------------------
// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */

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

/* ----------------------------------------------------------------------------- */

const inputUsername = document.getElementById('username')
const inputMessage = document.getElementById('inputMessage')
const btnSend = document.getElementById('btnSend')

const formPostMessage = document.getElementById('formPostMessage')
formPostMessage.addEventListener('submit', e => {
  e.preventDefault()
  console.log('Hi!')
  const message = {
    author: {
      email: inputUsername.value,
      fName: document.getElementById('firstname').value,
      lName: document.getElementById('lastname').value,
      age: document.getElementById('age').value,
      alias: document.getElementById('alias').value,
      avatar: document.getElementById('avatar').value
    },
    text: inputMessage.value,
  };

  socket.emit('newMessage', message);
  formPostMessage.reset()
  inputMessage.focus()
})

socket.on('messages', normalizedMessages => {
    // console.log(`Compression ratio: ${compressRatio}`);
    // document.getElementById('compression-info').innerText = compressRatio;

    const denormalizedMessages = denormalize(
      normalizedMessages.result, post, normalizedMessages.entities
    );
    console.log(denormalizedMessages.messages);
    const messageHtml = makeHtmlList(denormalizedMessages.messages)
    document.getElementById('messages').innerHTML = messageHtml;
})

function makeHtmlList(messages) {
    return messages.map(message => {
        return (`
            <div>
                <b style="color:blue;">${message.author.email}</b>
                [<span style="color:brown;">${message.fyh}</span>] :
                <i style="color:green;">${message.text}</i>
                <img width="50" src="${mensaje.author.avatar}" alt=" ">
            </div>
        `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const existEmail = inputUsername.value.length
    const existText = inputMessage.value.length
    inputMessage.disabled = !existEmail
    btnSend.disabled = !existEmail || !existText
})

inputMessage.addEventListener('input', () => {
    const existText = inputMessage.value.length
    btnSend.disabled = !existText
})