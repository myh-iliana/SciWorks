'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cathedra = sequelize.define('Cathedra', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  Cathedra.associate = function(models) {
    Cathedra.hasMany(models.User, { as: 'workers' });
  };
  return Cathedra;
};
