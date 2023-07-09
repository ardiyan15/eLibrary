const Sequelize = require("sequelize");

const sequelize = require("../../../util/database");

const Menu = sequelize.define("menu", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  descriptioln: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.INTEGER(2),
  },
  icon: {
    type: Sequelize.TEXT,
  },
});

module.exports = Menu;
