
/**
 * Index file to access services in the application
 */
const db = require('./database/index.js');
const graphql = require('./graphql/index.js');
const https = require('./https/index.js');
const auth = require('./auth/index.js');


module.exports = {
  db,
  graphql,
  https,
  auth,
};
