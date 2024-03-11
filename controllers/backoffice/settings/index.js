const Menu = require("../../../models/backoffice/menus/menu");
const subMenu = require("../../../models/backoffice/sub_menus/sub_menus");
const User = require("../../../models/backoffice/users/user");
const { encrypt } = require("../../../util/encrypted");

exports.getSetting = async (req, res, next) => {
  // let { language } = req.session.backOffice;

  // let label = require("../../../config/language/en/label");

  // if (language == "ID") {
  //   label = require("../../../config/language/id/label");
  // }

  const menus = await Menu.findAll({
    include: subMenu,
  });

  let languageOptions = [
    {
      key: "EN",
      value: "English",
    },
    {
      key: "ID",
      value: "Indonesia",
    },
  ];

  res.render("backoffice/settings/index", {
    isActive: true,
    parentMenu: "tools",
    flashMessage: "",
    // language,
    // label,
    languageOptions,
    menus,
    subMenuName: "setting"
  });
};

exports.saveSetting = async (req, res, next) => {
  let { userId } = req.body;
  let user = User.findByPk(userId);
};
