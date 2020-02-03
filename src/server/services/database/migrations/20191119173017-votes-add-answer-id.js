
module.exports = {
  up: (queryInterface, Sequelize) => {
    const addColumn = () => queryInterface.addColumn('Votes',
      'answerId',
      {
        type: Sequelize.INTEGER,
      });

    const createForeignKey = () => queryInterface.addConstraint('Votes', ['answerId'], {
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
      addColumn(), createForeignKey(),
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Votes', 'answerId'),
  ]),
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

};
