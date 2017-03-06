'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 10],
          msg: 'Password must be between 6 and 10 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, cb) {
        var hash = bcrypt.hashSync(createdUser.password, 10);
        cb(null, createdUser);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return user;
};