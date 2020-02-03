
const users = require('../util/users.js');
// let userId = require('../util/functions.js').getRandomUserId();
module.exports = {
  up: (queryInterface, Sequelize) =>
  // console.log('Random ID: ', userId);

    queryInterface.bulkInsert('Users',
      users), /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

};
