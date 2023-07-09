const express = require("express");
const router = express.Router();

const historyController = require("../../../controllers/backoffice/histories/index");
const isAuth = require("../../../middleware/is-auth");

router.get("/histories", historyController.getHistory);

router.get("/histories/:id", historyController.getDetail);

module.exports = { router };
