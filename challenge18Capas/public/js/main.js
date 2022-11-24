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

const inputUsername = document.getElementById('inputUsername')
const inputMessage = document.getElementById('inputMessage')
const btnSend = document.getElementById('btnSend')

const formPostMessage = document.getElementById('formPostMessage')
formPostMessage.addEventListener('submit', e => {
  e.preventDefault()

  const date = new Date;
  const fyh = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  const message = {
    name: inputUsername.value,
    message: inputMessage.value,
    fyh: fyh,
  };

  socket.emit('newMessage', message);
  formPostMessage.reset()
  inputMessage.focus()
})

socket.on('messages', messages => {
    // console.log(messages);
    const messageHtml = makeHtmlList(messages)
    document.getElementById('messages').innerHTML = messageHtml;
})


function makeHtmlList(messages) {
    return messages.map(message => {
        return (`
            <div>
                <b style="color:blue;">${message.name}</b>
                [<span style="color:brown;">${message.fyh}</span>] :
                <i style="color:green;">${message.message}</i>
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