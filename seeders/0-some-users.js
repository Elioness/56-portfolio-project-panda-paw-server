"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "eli1",
          email: "eli@1.com",
          password: bcrypt.hashSync("e1", SALT_ROUNDS),
          goal: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "eli2",
          email: "eli@2.com",
          password: bcrypt.hashSync("e2", SALT_ROUNDS),
          goal: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
