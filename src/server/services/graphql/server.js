/**
 * Standalone file if you want to run GraphQL server separately
 */

const path = require('path');
const express = require('express');

const app = express();
const helmet = require('helmet');
const services = require('../index.js');


app.disable('x-powered-by');
const utils = {
  db: services.db,
};

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: path.resolve(__dirname, '../../../../.env'),
  });
}

/* apply middleware to our express server, which is `app` */
const graphql = services.graphql.default(utils);

graphql.applyMiddleware({ app });

const port = process.env.GRAPHQL_PORT || 8001;


/* Basically field all get requests and send back it's only a GraphQL server */
app.get('/*', (req, res) => {
  res.send('GraphQL Only :-)');
});


/* Serve graphql over http, will be https in production */
app.listen(port, () => console.log(`[+] GraphQL server started on port ${port}`));
