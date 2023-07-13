const express = require("express");
const router = express.Router();

const subMenuController = require("../../../controllers/backoffice/submenus/index");

router.get("/submenus", subMenuController.getSubMenus);

router.get("/submenus/form", subMenuController.getAddSubMenu);

router.post("/submenus", subMenuController.saveSubMenu);

module.exports = { router };
