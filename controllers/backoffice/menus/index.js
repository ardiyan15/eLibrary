const Menu = require("../../../models/backoffice/menus/menu");

exports.getMenus = (req, res, next) => {
  res.render("backoffice/menus/index");
};

exports.addMenu = (req, res, next) => {
  res.render("backoffice/menus/form", {
    formTitle: "Add Menu",
    menu: "",
    buttonText: "Submit",
  });
};
