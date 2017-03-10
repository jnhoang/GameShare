'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('games', 'loaned', Sequelize.BOOLEAN);
    .then(function() {
      return queryInterface.addColumn('games', 'askerId', Sequelize.INTEGER);
    })
    .then(function() {
      return queryInterface.addColumn('users', 'image', Sequelize.STRING);
    })
    .then(function() {
      return queryInterface.addColumn('communities', 'image', Sequelize.STRING);
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('games', 'loaned');
    .then(function() {
      return queryInterface.removeColumn('games', 'askerId');
    })
    .then(function() {
      return queryInterface.removeColumn('users', 'image');
    })
    .then(function() {
      return queryInterface.removeColumn('communities', 'image');
    })
  }
};
