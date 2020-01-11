const db = require('./database/index.js');
const graphql = require('./graphql/index.js');

 //db.models['answer'].findAll().then((data) => console.log(data));

module.exports = {
    db,
    graphql
}