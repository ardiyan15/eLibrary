const express = require("express");
const router = express.Router();

const menuController = require("../../../controllers/backoffice/menus/index");

router.get("/menus", menuController.getMenus);

router.get("/menus/:id", menuController.getMenu);

router.get("/menus/form", menuController.addMenu);

router.post("/menus", menuController.saveMenu);

router.post("/menuDelete", menuController.deleteMenu);

router.post("/updatemenu/:id", menuController.updateMenu);

module.exports = { router };
