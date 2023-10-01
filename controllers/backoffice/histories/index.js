const Transaction = require("../../../models/backoffice/transactions/transaction");
const Transaction_detail = require("../../../models/backoffice/transaction_details/transaction_details");
const Books = require("../../../models/backoffice/books/book");
const label = require("../../../config/label");
const { Sequelize } = require("sequelize");

exports.getHistory = async (req, res) => {
  let transactions = await Transaction.findAll({
    attributes: {
      include: [
        [Sequelize.fn("COUNT", Sequelize.col("transaction_id")), "qty_item"],
      ],
    },
    include: [
      {
        model: Transaction_detail,
        attributes: [],
      },
    ],
    group: ["transaction.id"],
    raw: true,
    where: {
      status: 3,
    },
  });

  res.render("backoffice/histories/index", {
    flashMessage: "",
    transactions,
    label,
    parentMenu: "",
    isActive: false,
  });
};

exports.getDetail = async (req, res) => {
  let { id } = req.params;
  let transactions = await Transaction.findAll({
    where: {
      id,
    },
    attributes: ["*"],
    raw: true,
    nest: true,
    include: [
      {
        model: Transaction_detail,
        required: true,
        include: [
          {
            model: Books,
          },
        ],
      },
    ],
  });

  res.render("backoffice/histories/detail", {
    transactions,
    parentMenu: "",
    isActive: false,
  });
};
