const path = require('path');
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config({
//         path: path.resolve(__dirname, '../../../../../.env')
//     });
// }

// require('dotenv').config({
//   path: path.resolve(__dirname, '../../../../../.env')
// });



module.exports = {
    "development": {
        "username": process.env.MYSQL_USERNAME,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DB,
        "host": process.env.MYSQL_HOST,
        "logging": false,
        "dialect": "mysql"
        
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
      },
      "production": {
        "username": process.env.MYSQL_USERNAME,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DB,
        "host": process.env.MYSQL_HOST,
        "logging": false,
        "dialect": "mysql"
        
      }

}