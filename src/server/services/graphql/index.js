/* 

In this file, we will set up ApolloServer by:
    creating makeExecutableSchema
    exporting the ApolloServer


*/
import {makeExecutableSchema} from 'graphql-tools';
import {ApolloServer} from 'apollo-server-express';
import Resolvers from './resolvers.js';
import typeDefs from './schema.js';

export default (utils) => {

    const theSchema = makeExecutableSchema({
        typeDefs,
        resolvers: Resolvers(utils),
    });
    
    const server = new ApolloServer({
        schema: theSchema,
        context: ({req}) => req,
        playground: process.env.NODE_ENV === 'production' ? false : true
    });

    return server;
}

