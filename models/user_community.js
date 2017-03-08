'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_community = sequelize.define('user_community', {
    userId: DataTypes.INTEGER,
    communityId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_community;
};