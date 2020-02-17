var path = require("path");
//import ApolloClient from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import store from '../../store/index';
import {setGraphQLError} from '../../store/graphql/actions';

//authorization link to send a bearer token to authenticate GQL requests
const AuthLink = (operation, next) => {
  const user = JSON.parse(localStorage.getItem("_askitapp_user"));
  //console.log('Inside of AuthLink...');
   
    if (user && user.token) {
      //console.log('There is a user token...');
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
      let gqlErrors = 0;
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          gqlErrors++;
          if (gqlErrors <= 1) {
            store.dispatch(setGraphQLError(message));
          }

        }
          

        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
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
