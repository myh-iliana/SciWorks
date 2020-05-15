'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Monographs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      section: Sequelize.STRING,
      monographPages: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      printPages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      annotations: Sequelize.TEXT,
      isbn: Sequelize.STRING,
      doi: Sequelize.STRING,
      isEuLanguage: Sequelize.BOOLEAN,
      files: Sequelize.STRING,
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subauthors: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Monographs');
  }
};
