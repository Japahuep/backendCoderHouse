const socket = io.connect();
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

/*==========================[Products]=========================*/
socket.on("cart", (cart) => {
  makeHtmlTable(cart).then((html) => {
    document.getElementById("cart").innerHTML = html;
  });
});

function makeHtmlTable(cart) {
  return fetch("templates/cart-table.hbs")
    .then((res) => res.text())
    .then((tpl) => {
      const template = Handlebars.compile(tpl);
      const html = template({ cart });
      return html;
    });
}

/*==========================[Messages]=========================*/
// Desnormalización de mensajes
//  Definimos un esquema de autor
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

const inputMessage = document.getElementById("inputMessage");
const btnSend = document.getElementById("btnSend");

const formPostMessage = document.getElementById("formPostMessage");

formPostMessage.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = new Date();
  const fyh = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  fetch("/api/user")
    .then((resp) => resp.json())
    .then((userData) => {
      const message = {
        author: {
          email: userData.username,
          name: userData.name,
          age: userData.age,
          avatar: userData.photo,
        },
        text: inputMessage.value,
        fyh: fyh,
      };
      socket.emit("newMessage", message);
      formPostMessage.reset();
      inputMessage.focus();
    });
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

inputMessage.addEventListener("input", () => {
  const existText = inputMessage.value.length;
  btnSend.disabled = !existText;
});
