'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Periodicities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      udc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      journal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      issueNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      journalPages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      annotations: {
        type: Sequelize.TEXT
      },
      issn: {
        type: Sequelize.STRING
      },
      doi: {
        type: Sequelize.STRING
      },
      isScopusAndWS: {
        type: Sequelize.BOOLEAN
      },
      isScientometrics: {
        type: Sequelize.BOOLEAN
      },
      isProfessional: {
        type: Sequelize.BOOLEAN
      },
      isElectronic: {
        type: Sequelize.BOOLEAN
      },
      files: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Periodicities');
  }
};
