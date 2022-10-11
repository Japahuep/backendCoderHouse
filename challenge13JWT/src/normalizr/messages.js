import { normalize, schema } from "normalizr";

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

const normalizeMessages = (messages) => {
  const normalizedMessages = {
    id: "messages",
    messages: messages,
  };
  return normalize(normalizedMessages, schemaMessages);
};

export { normalizeMessages };
