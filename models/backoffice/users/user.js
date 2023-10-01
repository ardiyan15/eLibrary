const { encrypt } = require("../../../util/encrypted");

const Sequelize = require("sequelize");

const sequelize = require("../../../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(60),
    get() {
      const rawUsername = this.getDataValue("username");
      const rawId = this.getDataValue("id");
      return `<a href="/backoffice/users/detail/${encrypt(
        rawId
      )}">${rawUsername}</a>`;
    },
  },
  password: Sequelize.STRING(128),
  roles: Sequelize.STRING(30),
  email: Sequelize.STRING(30),
  image: Sequelize.STRING(128),
  language: Sequelize.STRING(2),
});

module.exports = User;
