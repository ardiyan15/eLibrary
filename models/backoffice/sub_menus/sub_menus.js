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
  menu_id: {
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
  url: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
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
    }
  },
});

module.exports = Sub_menus;
