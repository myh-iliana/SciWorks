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
      section: {
        type: Sequelize.STRING,
      },
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
      annotations: {
        type: Sequelize.TEXT,
      },
      isbn: {
        type: Sequelize.STRING,
      },
      doi: {
        type: Sequelize.STRING,
      },
      isEuLanguage: {
        type: Sequelize.BOOLEAN,
      },
      files: {
        type: Sequelize.STRING,
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
