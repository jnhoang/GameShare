'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'games',
      'askerUsername',
      {
        type: Sequelize.STRING,
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'games',
      'askerUsername',
      {
        type: Sequelize.INTEGER,
      }
    )
  }
};
