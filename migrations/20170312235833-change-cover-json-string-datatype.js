'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'games',
      'cover',
      {
        type: Sequelize.STRING,
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'games',
      'cover',
      {
        type: Sequelize.JSON,
      }
    )
  }
};
