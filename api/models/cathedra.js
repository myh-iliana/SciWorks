'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cathedra = sequelize.define('Cathedra', {
    name: DataTypes.STRING
  }, {});
  Cathedra.associate = function(models) {
    // associations can be defined here
  };
  return Cathedra;
};