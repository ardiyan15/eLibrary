const Menu = require("../../../models/backoffice/menus/menu");
const subMenu = require("../../../models/sub_menus");

exports.getSubMenus = async (req, res, next) => {
  res.render("backoffice/submenu/index", {
    flashMessage: "",
    isActive: "sub_menu",
    parentMenu: "master",
  });
};

exports.getAddSubMenu = async (req, res, next) => {
  const menus = await Menu.findAll();
  res.render("backoffice/submenu/form", {
    formTitle: "Add Sub Menu",
    menus,
    menu: "",
    buttonText: "Submit",
    parentMenu: "master",
    isActive: "sub_menu",
  });
};

exports.saveSubMenu = async (req, res, next) => {
  const submenus = await subMenu.findAll();

  res.send("ok");
};
