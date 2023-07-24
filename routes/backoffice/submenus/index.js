const express = require("express");
const router = express.Router();

const subMenuController = require("../../../controllers/backoffice/submenus/index");

router.get("/submenus", subMenuController.getSubMenus);

router.get("/submenu/:id", subMenuController.getSubMenu);

router.get("/submenus/form", subMenuController.getAddSubMenu);

router.post("/submenus", subMenuController.saveSubMenu);

router.post('/updatesubmenus/:id', subMenuController.updateSubMenu);

module.exports = { router };
