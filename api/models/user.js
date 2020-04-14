'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isTeacher: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
    cathedraId: DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Cathedra, { foreignKey: 'cathedraId', as: 'cathedra' });
  };
  return User;
};
