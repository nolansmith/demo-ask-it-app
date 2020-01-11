"use strict";
const Question = require("./question");
const Vote = require("./votes");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    //console.log('Performing association ', models)
    user.hasMany(models.Question);
    user.hasMany(models.Answer);
    user.hasMany(models.Vote);
  };

  return user;
};
