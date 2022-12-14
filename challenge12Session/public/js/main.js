const socket = io.connect();
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
//------------------------------------------------------------------------------------

const formSaveProduct = document.getElementById("formSaveProduct");
formSaveProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    title: formSaveProduct[0].value,
    price: formSaveProduct[1].value,
    thumbnail: formSaveProduct[2].value,
  };
  socket.emit("newProduct", product);
  formSaveProduct.reset();
});

socket.on("products", (products) => {
  makeHtmlTable(products).then((html) => {
    document.getElementById("products").innerHTML = html;
  });
});

function makeHtmlTable(products) {
  return fetch("templates/products-table.hbs")
    .then((res) => res.text())
    .then((tpl) => {
      const template = Handlebars.compile(tpl);
      const html = template({ products });
      return html;
    });
}

//-------------------------------------------------------------------------------------

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new schema.Entity("authors", {}, { idAttribute: "email" });

// Definimos un esquema de mensaje
const schemaMessage = new schema.Entity("text", {
  author: schemaAuthor,
});

// Definimos un esquema de posts
const schemaMessages = new schema.Entity("posts", {
  messages: [schemaMessage],
});
/* ----------------------------------------------------------------------------- */

const inputUsername = document.getElementById("inputUsername");
const inputMessage = document.getElementById("inputMessage");
const btnSend = document.getElementById("btnSend");

const formPostMessage = document.getElementById("formPostMessage");
formPostMessage.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = new Date();
  const fyh = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  const message = {
    author: {
      email: inputUsername.value,
      fName: document.getElementById("firstname").value,
      lName: document.getElementById("lastname").value,
      age: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: inputMessage.value,
    fyh: fyh,
  };

  socket.emit("newMessage", message);
  formPostMessage.reset();
  inputMessage.focus();
});

socket.on("messages", (normalizedMessages) => {
  const denormalizedMessages = denormalize(
    normalizedMessages.result,
    schemaMessages,
    normalizedMessages.entities
  );
  const originalSize = JSON.stringify(denormalizedMessages).length;
  const compressSize = JSON.stringify(normalizedMessages).length;
  const compressRatio = ((100 * compressSize) / originalSize).toFixed(2);

  document.getElementById("compression-info").innerText = compressRatio;

  const messageHtml = makeHtmlList(denormalizedMessages.messages);
  document.getElementById("messages").innerHTML = messageHtml;
});

function makeHtmlList(messages) {
  return messages
    .map((message) => {
      return `
            <div>
                <b style="color:blue;">${message.author.email}</b>
                [<span style="color:brown;">${message.fyh}</span>] :
                <i style="color:green;">${message.text}</i>
                <img width="50" src="${message.author.avatar}" alt=" ">
            </div>
        `;
    })
    .join(" ");
}

inputUsername.addEventListener("input", () => {
  const existEmail = inputUsername.value.length;
  const existText = inputMessage.value.length;
  inputMessage.disabled = !existEmail;
  btnSend.disabled = !existEmail || !existText;
});

inputMessage.addEventListener("input", () => {
  const existText = inputMessage.value.length;
  btnSend.disabled = !existText;
});
