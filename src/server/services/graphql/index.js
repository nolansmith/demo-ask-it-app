/*

In this file, we will set up ApolloServer by:
    creating makeExecutableSchema
    exporting the ApolloServer


*/
import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server-express";

import Resolvers from "./resolvers.js";
import typeDefs from "./schema.js";
import auth from "./auth.js";
const tokenService = require('../auth/index.js');

export default utils => {
  const theSchema = makeExecutableSchema({
    typeDefs,
    resolvers: Resolvers(utils),
    schemaDirectives: {
      auth
    }
  });

  const server = new ApolloServer({
    schema: theSchema,
    context: async ({ req }) => {
      // const authorization = req.headers.authorization;
      // if (typeof authorization !== typeof undefined) {
      //   var search = "Bearer";
      //   var regEx = new RegExp(search, "ig");
      //   const token = authorization.replace(regEx, "").trim();
      //   let {valid} = tokenService.checkUserLoginToken(token);
      //   if (valid === false) return req;
      //   return Object.assign({}, {...req}, {token: token});

      // } else {
      //   return req;
      // }
      // if (!req.session.user) return req;
      // const { token } = req.session.user;
      // try {
      //   let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log("Token good");
      //   return req;
      // } catch (error) {
      //   console.log("Token bad");
      //   let _req = { ...req };
      //   _req.session.user = null;
      //   return _req;
      // }
      // const { authorization } = req.headers;
      // if (typeof authorization !== typeof undefined) {
      //   const search = 'Bearer';
      //   const regEx = new RegExp(search, 'ig');
      //   const token = authorization.replace(regEx, '').trim();
      //   return jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      //     if (err) {
      //       return req;
      //     }
      //     return utils.db.models.User.findOne({ where: { id: result.id } }).then((user) => ({ ...req, user: user }));
      //   });
      // }
      // return req;
      return req;
      
    },
    playground: true //process.env.NODE_ENV !== "production"
  });

  return server;
};
