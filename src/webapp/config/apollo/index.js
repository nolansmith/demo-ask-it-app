var path = require("path");
import ApolloClient from "apollo-boost";

//decide which URL to use from .env
let url =
  process.env.NODE_ENV === "production"
    ? process.env.GRAPHQL_PRODUCTION_URL
    : process.env.GRAPHQL_DEVELOPMENT_URL;

const client = new ApolloClient({
  uri: url
});

export default client;
