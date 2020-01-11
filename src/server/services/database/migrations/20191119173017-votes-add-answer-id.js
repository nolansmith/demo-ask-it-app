'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    let addColumn = () => queryInterface.addColumn('Votes',
        'answerId',
        {
          type: Sequelize.INTEGER,
        });

      let createForeignKey = () => queryInterface.addConstraint('Votes', ['answerId'], {
        type: 'foreign key',
        name: 'fk_answerid_Votes',
        references: {
          table: 'Answers',
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
      queryInterface.removeColumn('Votes', 'answerId'),
    ]);
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
