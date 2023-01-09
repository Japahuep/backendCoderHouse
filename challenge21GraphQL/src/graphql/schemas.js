import { buildSchema } from "graphql";

const productSchema = new buildSchema(
  `
    input ProductInput {
      title: String!,
      price: Int!,
      thumbnail: String,
    }

    type Product {
      id: String!,
      title: String!,
      price: Int!,
      thumbnail: String,
      timestamp: Float,
    }

    type Query {
      qryProducts: [Product],
      qryProduct(id: String): Product
    }

    type Mutation {
      createProduct(data: ProductInput): Product,
      updateProduct(id: String!, data: ProductInput): Product,
      deleteProduct(id: String!): Product
    }
  `
);

const messageSchema = new buildSchema(
  `
    input MessageInput {
      author: AuthorInput!,
      text: String!,
      fyh: String,
    }

    input AuthorInput {
      email: String!,
      fName: String!,
      lName: String,
      age: Int,
      alias: String,
      avatar: String,
    }

    type Message {
      id: String!,
      author: Author!,
      text: String!,
      fyh: String!,
      timestamp: Float,
    }

    type Author {
      email: String!,
      fName: String!,
      lName: String,
      age: Int,
      alias: String,
      avatar: String,
    }

    type Query {
      qryMessages: [Message],
      qryMessage(id: String): Message
    }

    type Mutation {
      createMessage(data: MessageInput): Message,
      deleteMessage(id: String!): Message
    }
  `
);

export { productSchema, messageSchema };
