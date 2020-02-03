
module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('Vote', {
    action: DataTypes.STRING,
  }, {});
  votes.associate = function (models) {
    // associations can be defined here
    // votes.belongsTo(models.question);
    votes.belongsTo(models.User);
    votes.belongsTo(models.Answer);
  };


  return votes;
};
