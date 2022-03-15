"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transpoFootprints", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      footBikeDistance: {
        type: Sequelize.INTEGER,
      },
      trainDistance: {
        type: Sequelize.INTEGER,
      },
      carDistance: {
        type: Sequelize.INTEGER,
      },
      planeDistance: {
        type: Sequelize.INTEGER,
      },
      footBikeDays: {
        type: Sequelize.INTEGER,
      },
      trainDays: {
        type: Sequelize.INTEGER,
      },
      carDays: {
        type: Sequelize.INTEGER,
      },
      planeDays: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transpoFootprints");
  },
};
