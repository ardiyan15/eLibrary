const Sequelize = require("sequelize");

const sequelize = require("../../../util/database");
const subMenu = require("../sub_menus/sub_menus");

const Menu = sequelize.define(
  "menu",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      get() {
        const rawValue = this.getDataValue("name");
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    description: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.INTEGER(2),
      get() {
        const rawStatus = this.getDataValue("status");

        const resultStatus = [];
        if (rawStatus == 1) {
          resultStatus.push({
            status: "<span class='badge badge-success'>Active</span>",
            button:
              "<button class='btn btn-warning btn-sm rounded'>Deactivate</button>",
          });
        } else {
          resultStatus.push({
            status: "<span class='badge badge-danger'>Inactive</span>",
            button:
              "<button class='btn btn-primary btn-sm rounded'>Activate</button>",
          });
        }
        return resultStatus;
      },
    },
    icon: {
      type: Sequelize.TEXT,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Menu;
