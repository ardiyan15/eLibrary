"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("sub_menus", "status", {
      type: Sequelize.TINYINT,
      defaultValue: 0,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("sub_menus", "status");
  },
};
