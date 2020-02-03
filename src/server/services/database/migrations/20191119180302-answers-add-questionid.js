
module.exports = {
  up: (queryInterface, Sequelize) => {
    const addColumn = () => queryInterface.addColumn('Answers',
      'questionId',
      {
        type: Sequelize.INTEGER,
      });

    const createForeignKey = () => queryInterface.addConstraint('Answers', ['questionId'], {
      type: 'foreign key',
      name: 'fk_questionid_Answers',
      references: {
        table: 'Questions',
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
    queryInterface.removeColumn('Answers', 'questionId'),
  ]),
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

};
