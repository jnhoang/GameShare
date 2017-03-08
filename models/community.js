'use strict';
module.exports = function(sequelize, DataTypes) {
  var community = sequelize.define('community', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        models.community.belongsToMany(models.user, {through: models.user_community});
      }
    }
  });
  return community;
};