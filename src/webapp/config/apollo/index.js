var path = require("path");
//import ApolloClient from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

//authorization link to send a bearer token to authenticate GQL requests
const AuthLink = (operation, next) => {
  const user = JSON.parse(localStorage.getItem("_askitapp_user"));
  //console.log('Inside of AuthLink...');
   
    if (user && user.token) {
    operation.setContext(context => {
     
      return ({
        ...context,
        headers: {
          ...context.headers,
          Authorization: `Bearer ${user.token}`
        }
      })
    });
  }
  return next(operation);
};

//decide which URL to use from .env
let url =
  process.env.NODE_ENV === "production"
    ? process.env.GRAPHQL_PRODUCTION_URL
    : process.env.GRAPHQL_DEVELOPMENT_URL;

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      /**
       * uncomment below to log errors
       */
      // if (graphQLErrors)
      //   graphQLErrors.forEach(({ message, locations, path }) =>
      //     console.log(
      //       `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      //     )
      //   );
      // if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    AuthLink,
    new HttpLink({
      uri: url,
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache()
});

export default client;
