const express = require("express");
const router = express.Router();

const menuController = require("../../../controllers/backoffice/menus/index");

router.get("/menus", menuController.getMenus);

router.get("/menus/form", menuController.addMenu);

module.exports = { router };
