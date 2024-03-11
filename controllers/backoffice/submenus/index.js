const Menu = require("../../../models/backoffice/menus/menu");
const subMenu = require("../../../models/backoffice/sub_menus/sub_menus");
const { encrypt, decrypt } = require("../../../util/encrypted");
const globalQuery = require("../../../util/globalQuery");
const Redis = require("../../../util/redis");

exports.getSubMenus = async (req, res, next) => {
  const results = await subMenu.findAll({
    nest: true,
    include: [
      {
        model: Menu,
      },
    ],
    order: [["id", "DESC"]],
  });

  res.render("backoffice/submenu/index", {
    flashMessage: "",
    isActive: "sub_menu",
    parentMenu: "master_data",
    subMenuName: "sub_menu",
    results,
    encrypt,
  });
};

exports.getSubMenu = async (req, res, next) => {
  const { id } = req.params;
  const idDecrypted = decrypt(id);
  const result = await subMenu.findByPk(idDecrypted);
  // const menus = await Menu.findAll();
  const menus = await Menu.findAll({
    include: subMenu,
  });
  const subMenuIdEncrypted = encrypt(result.id);

  res.render("backoffice/submenu/form", {
    formTitle: "Edit Sub Menu",
    subMenu: result,
    buttonText: "Update",
    parentMenu: "master",
    isActive: "sub_menu",
    subMenuName: "menu",
    subMenuIdEncrypted,
    menus,
  });
};

exports.getAddSubMenu = async (req, res, next) => {
  const menus = await Menu.findAll({
    include: subMenu,
  });
  res.render("backoffice/submenu/form", {
    formTitle: "Add Sub Menu",
    menus,
    subMenu: "",
    buttonText: "Submit",
    parentMenu: "master_data",
    subMenuName: "menu",
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

exports.updateSubMenu = async (req, res, next) => {
  const { parent_menu, name, description, url } = req.body;
  const { id } = req.params;

  let subMenuIdDecrypted = decrypt(id);

  const SubMenu = await subMenu.findByPk(subMenuIdDecrypted);
  try {
    SubMenu.menu_id = parent_menu;
    SubMenu.name = name;
    SubMenu.description = description;
    SubMenu.url = url;
    SubMenu.save();
    // let menus = await globalQuery(Menu, "findAll", { status: 1 });
    // let subMenus = await globalQuery(subMenu, "findAll", { status: 1 });
    // await Redis("menus", JSON.stringify(menus), "set");
    // await Redis("sub_menus", JSON.stringify(subMenus), "set");
    req.flash("success", "Successfully update user");
    res.redirect("/backoffice/submenus");
  } catch (err) {
    throw err;
  }
};
