const { encrypt, decrypt } = require("../../../util/encrypted");

const Menu = require("../../../models/backoffice/menus/menu");

exports.getMenus = async (req, res, next) => {
  const flashMessage = req.flash("success");
  const menus = await Menu.findAll({
    order: [["id", "DESC"]],
  });

  res.render("backoffice/menus/index", {
    flashMessage,
    menus,
    encrypt,
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
  });
};

exports.addMenu = (req, res, next) => {
  res.render("backoffice/menus/form", {
    formTitle: "Add Menu",
    menu: "",
    buttonText: "Submit",
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

  menu.name = name;
  menu.description = description;
  menu.icon = icon;
  menu.save();

  req.flash("success", "Successfully update menu");
  res.redirect("/backoffice/menus");
};

exports.deleteMenu = async (req, res, next) => {
  const { menuId } = req.body;
  const menuIdDecrypted = decrypt(menuId);
  const menu = await Menu.findByPk(menuIdDecrypted);
  menu.destroy();

  req.flash("success", "Successfully delete menu");
  res.redirect("/backoffice/menus");
};
