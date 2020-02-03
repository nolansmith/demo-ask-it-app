
module.exports = {
  up: (queryInterface, Sequelize) => {
    const addColumn = () => queryInterface.addColumn('Questions',
      'userId',
      {
        type: Sequelize.UUID,
      });

    const createForeignKey = () => queryInterface.addConstraint('Questions', ['userId'], {
      type: 'foreign key',
      name: 'fk_userid_Questions',
      references: {
        table: 'Users',
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
    queryInterface.removeColumn('Questions', 'userId'),
  ]),
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

};
