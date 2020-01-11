'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    let addColumn = () => queryInterface.addColumn('Answers',
        'userId',
        {
          type: Sequelize.UUID,
        });

      let createForeignKey = () => queryInterface.addConstraint('Answers', ['userId'], {
        type: 'foreign key',
        name: 'fk_userid_Answers',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });

   
    return Promise.all([
      addColumn(), createForeignKey()
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeColumn('Answers', 'userId'),
    ]);
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
