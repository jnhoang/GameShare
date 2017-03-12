'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.renameColumn('games', 'askerId', 'askerUsername')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('games', 'askerUsername', 'askerId')
  }
};
