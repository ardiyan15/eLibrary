const { encrypt, decrypt } = require("../../../util/encrypted");
const globalQuery = require("../../../util/globalQuery");
const Redis = require("../../../util/redis");

const Menu = require("../../../models/backoffice/menus/menu");

exports.getMenus = async (req, res, next) => {
  const flashMessage = req.flash("success");
  const results = await Menu.findAll({
    order: [["id", "DESC"]],
  });

  res.render("backoffice/menus/index", {
    flashMessage,
    results,
    encrypt,
    parentMenu: "master_data",
    subMenuName: "menu",
    isActive: true,
  });
};

exports.addMenu = (req, res, next) => {
  let menu = [];

  res.render("backoffice/menus/form", {
    formTitle: "Add Menu",
    menu,
    buttonText: "Submit",
    parentMenu: "master_data",
    subMenuName: "menu",
    isActive: true,
  });
};

exports.getMenu = async (req, res, next) => {
  const { id } = req.params;
  const menuIdDecrypted = decrypt(id);
  const menu = await Menu.findByPk(menuIdDecrypted);

  res.render("backoffice/menus/form", {
    formTitle: "Edit Menu",
    buttonText: "Update",
    menuIdEncrypted: id,
    menu,
    parentMenu: "master_data",
    subMenuName: "menu",
    isActive: true,
  });
};

exports.saveMenu = (req, res, next) => {
  const { name, description, icon } = req.body;

  Menu.create({
    name,
    description,
    status: 1,
    icon,
  });
  req.flash("success", "Successfully Add Menu");
  res.redirect("/backoffice/menus");
};

exports.updateMenu = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, icon } = req.body;

  const menuIdDecrypred = decrypt(id);
  const menu = await Menu.findByPk(menuIdDecrypred);

  try {
    menu.name = name;
    menu.description = description;
    menu.icon = icon;
    await menu.save();
    let menus = await globalQuery(Menu, "findAll", { status: 1 });
    await Redis("menus", JSON.stringify(menus), "set");
    req.flash("success", "Successfully update menu");
    res.redirect("/backoffice/menus");
  } catch (err) {
    throw err;
  }
};

exports.deleteMenu = async (req, res, next) => {
  const { menuId } = req.body;
  const menuIdDecrypted = decrypt(menuId);
  const menu = await Menu.findByPk(menuIdDecrypted);
  menu.destroy();

  req.flash("success", "Successfully delete menu");
  res.redirect("/backoffice/menus");
};
