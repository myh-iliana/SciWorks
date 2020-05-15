'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Theses', {
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
      conference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dates: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      collectionPages: {
        type: Sequelize.STRING,
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
      isInternational: {
        type: Sequelize.BOOLEAN
      },
      files: {
        type: Sequelize.STRING,
      },
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Theses');
  }
};
