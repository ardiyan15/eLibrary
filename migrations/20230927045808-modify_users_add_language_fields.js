"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "language", {
      type: Sequelize.STRING(2),
      allowNull: false,
      defaultValue: "EN",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "language");
  },
};
