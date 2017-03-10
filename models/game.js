'use strict';
module.exports = function(sequelize, DataTypes) {
  var game = sequelize.define('game', {
    title: DataTypes.STRING,
    cover: DataTypes.JSON,
    igdbId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    loaned: DataTypes.BOOLEAN,
    askerId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.game.belongsTo(models.user);
      }
    }
  });
  return game;
};