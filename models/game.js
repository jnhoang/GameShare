'use strict';
module.exports = function(sequelize, DataTypes) {
  var game = sequelize.define('game', {
    title: DataTypes.STRING,
    cover: DataTypes.TEXT,
    igdbId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    loaned: DataTypes.BOOLEAN,
    askerUsername: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.game.belongsTo(models.user);
      }
    }
  });
  return game;
};