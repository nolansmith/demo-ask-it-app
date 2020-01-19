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
import jwt from "jsonwebtoken";

export default utils => {
  const theSchema = makeExecutableSchema({
    typeDefs,
    resolvers: Resolvers(utils),
    schemaDirectives: {
      auth: auth
    }
  });

  const server = new ApolloServer({
    schema: theSchema,
    context: async ({ req }) => {
      const authorization = req.headers.authorization;
      if (typeof authorization !== typeof undefined) {
        var search = "Bearer";
        var regEx = new RegExp(search, "ig");
        const token = authorization.replace(regEx, "").trim();
        return jwt.verify(token, process.env.JWT_SECRET, function(err, result) {
          if (err) {
            return req;
          } else {
            return utils.db.models.User.findOne({where: { id: result.id}}).then(user => {
              return Object.assign({}, req, { authenticatedUser: user });
            });
          }
        });
      } else {
        return req;
      }
    },
    playground: process.env.NODE_ENV === "production" ? false : true
  });

  return server;
};
