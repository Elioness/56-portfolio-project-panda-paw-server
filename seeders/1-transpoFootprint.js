"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "transpoFootprints",
      [
        {
          userId: 1,
          title: "Office Transpo",
          footBikeDistance: 5,
          trainDistance: 5,
          carDistance: 0,
          planeDistance: 0,
          footBikeDays: 5,
          trainDays: 15,
          carDays: 0,
          planeDays: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 1,
          title: "Office Transpo",
          footBikeDistance: 6,
          trainDistance: 0,
          carDistance: 6,
          planeDistance: 0,
          footBikeDays: 5,
          trainDays: 0,
          carDays: 15,
          planeDays: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("transpoFootprints", null, {});
  },
};
