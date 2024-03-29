const Sequelize = require("sequelize");

const sequelize = require("../../../util/database");
const Transaction_detail = require("../transaction_details/transaction_details");

const Transaction = sequelize.define("transaction", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  transaction_number: {
    type: Sequelize.STRING,
  },
  address_delivery: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
  created_by: {
    type: Sequelize.STRING,
  },
});

module.exports = Transaction;

Transaction.hasMany(Transaction_detail, {
  foreignKey: "transaction_id",
});

Transaction_detail.belongsTo(Transaction, {
  foreignKey: "transaction_id",
});
