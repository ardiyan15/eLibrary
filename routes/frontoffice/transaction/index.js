const express = require("express");
const router = express.Router();

const transactionController = require("../../../controllers/frontoffice/transaction/index");

router.get("/transaction", transactionController.index);

router.post("/transaction", transactionController.closeOrder);

module.exports = { router };
