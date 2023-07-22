const Menu = require("../../../models/backoffice/menus/menu");
const subMenu = require("../../../models/backoffice/sub_menus/sub_menus");

exports.getSubMenus = async (req, res, next) => {
  const subMenus = await subMenu.findAll({
    include: [
      {
        model: Menu,
        required: true,
      },
    ],
    order: [["id", "DESC"]],
  });

  res.render("backoffice/submenu/index", {
    flashMessage: "",
    isActive: "sub_menu",
    parentMenu: "master",
    subMenus,
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
  const { parent_menu, name, description, icon, url } = req.body;
  try {
    subMenu.create({
      menu_id: parent_menu,
      name,
      description,
      icon,
      url,
    });
    req.flash("success", "Successfully Add User");
    res.redirect("/backoffice/submenus");
  } catch (err) {
    throw err;
  }
};
