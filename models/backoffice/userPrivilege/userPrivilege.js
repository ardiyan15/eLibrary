const { encrypt } = require("../../../util/encrypted");

const Sequelize = require("sequelize");

const sequelize = require("../../../util/database");

const UserPrivilege = sequelize.define("user_privileges", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  subMenuId: Sequelize.STRING(60),
  userId: Sequelize.STRING(128),
  access: Sequelize.STRING(30)
});

module.exports = UserPrivilege;
