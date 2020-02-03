
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('Answer', {
    text: DataTypes.STRING,
  }, {});
  answer.associate = function (models) {
    // associations can be defined here
    answer.belongsTo(models.Question);
    answer.belongsTo(models.User);
    answer.hasMany(models.Vote);
  };
  return answer;
};
