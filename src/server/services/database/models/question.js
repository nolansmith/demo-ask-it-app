'use strict';

module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('Question', {
  
    text: DataTypes.STRING
  }, {});
  question.associate = function(models) {
    // associations can be defined here
    question.belongsTo(models.User);
    question.hasMany(models.Answer);
  };
  
  return question;
};