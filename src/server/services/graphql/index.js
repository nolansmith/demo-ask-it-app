/*

In this file, we will set up ApolloServer by:
    creating makeExecutableSchema
    exporting the ApolloServer


*/
import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import Resolvers from './resolvers.js';
import typeDefs from './schema.js';
import auth from './auth.js';

export default (utils) => {
  const theSchema = makeExecutableSchema({
    typeDefs,
    resolvers: Resolvers(utils),
    schemaDirectives: {
      auth,
    },
  });

  const server = new ApolloServer({
    schema: theSchema,
    context: async ({ req }) => {
      const { authorization } = req.headers;
      if (typeof authorization !== typeof undefined) {
        const search = 'Bearer';
        const regEx = new RegExp(search, 'ig');
        const token = authorization.replace(regEx, '').trim();
        return jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
          if (err) {
            return req;
          }
          return utils.db.models.User.findOne({ where: { id: result.id } }).then((user) => ({ ...req, authenticatedUser: user }));
        });
      }
      return req;
    },
    playground: process.env.NODE_ENV !== 'production',
  });

  return server;
};
