'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    given_name: DataTypes.STRING,
    family_name: DataTypes.STRING,
    auth0_id: DataTypes.STRING,
    active: DataTypes.TINYINT
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'users'
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};