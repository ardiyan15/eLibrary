const Menu = require("../../../models/backoffice/menus/menu");
const subMenu = require("../../../models/sub_menus");

exports.getSubMenus = async (req, res, next) => {
  res.render("backoffice/submenu/index", {
    flashMessage: "",
  });
};

exports.getAddSubMenu = async (req, res, next) => {
  const menus = await Menu.findAll();
  res.render("backoffice/submenu/form", {
    formTitle: "Add Sub Menu",
    menus,
    menu: "",
    buttonText: "Submit",
    isShow: true,
  });
};

exports.saveSubMenu = async (req, res, next) => {
  const submenus = await subMenu.findAll();

  console.log(submenus);
  res.send("ok");
};
