const express = require("express");
const router = express.Router();

const settingController = require("../../../controllers/backoffice/settings/index");
const isAuth = require("../../../middleware/is-auth");

router.get("/setting", settingController.getSetting);

router.post("/setting", settingController.saveSetting);

module.exports = { router };
