const Menu = require("../../../models/backoffice/menus/menu");

exports.getSubMenus = async (req, res, next) => {
  res.render("backoffice/submenu/index", {
    flashMessage: "",
  });
};

exports.getAddSubMenu = async (req, res, next) => {
  const Menu = await Menu.findAll();
  res.render("backoffice/submenu/form", {
    formTitle: "Add Sub Menu",
    menu: "",
    buttonText: "Submit",
  });
};
