const Sequelize = require("sequelize");

const sequelize = require("../../../util/database");

const Sub_menus = sequelize.define("sub_menus", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.INTEGER,
  },
  menu: {
    type: Sequelize.BIGINT,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Sub_menus;
