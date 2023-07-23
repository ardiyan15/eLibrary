const Menu = require("../../../models/backoffice/menus/menu");
const subMenu = require("../../../models/backoffice/sub_menus/sub_menus");
const { encrypt, decrypt } = require("../../../util/encrypted");

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
    encrypt,
  });
};

exports.getSubMenu = async (req, res, next) => {
  const { id } = req.params;
  const idDecrypted = decrypt(id);
  const result = await subMenu.findByPk(idDecrypted);
  const menus = await Menu.findAll();
  const subMenuIdEncrypted = encrypt(result.id);

  res.render("backoffice/submenu/form", {
    formTitle: "Edit Sub Menu",
    subMenu: result,
    buttonText: "Update",
    parentMenu: "master",
    isActive: "sub_menu",
    subMenuIdEncrypted,
    menus,
  });
};

exports.getAddSubMenu = async (req, res, next) => {
  const menus = await Menu.findAll();
  res.render("backoffice/submenu/form", {
    formTitle: "Add Sub Menu",
    menus,
    subMenu: "",
    buttonText: "Submit",
    parentMenu: "master",
    isActive: "sub_menu",
    csrfToken: req.csrfToken(),
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
