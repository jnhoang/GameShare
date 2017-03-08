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
        console.log(createdUser.password);
        var hash = bcrypt.hashSync(createdUser.password, 10);
        console.log(hash);                              //debugging code
        createdUser.password = hash;
        cb(null, createdUser);
      }
    },
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.game);
        models.user.belongsToMany(models.community, {through: models.user_community});
      }
    },
    instanceMethods: {
      isValidPassword: function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password);
      },
      toJSON: function() {
        var data = this.get();
        delete data.password;
        return data;
      }
    }
  });
  return user;
};