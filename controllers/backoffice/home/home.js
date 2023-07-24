const Redis = require("../../../util/redis");

exports.getHome = async (req, res, next) => {
  // if (!req.session.backOffice) {
  //   if (!req.session.backOffice || req.session.backOffice.roles != "admin") {
  //     return res.redirect("/backoffice");
  //   }
  // }
  const subMenus = JSON.parse(await Redis('sub_menus'))

  res.render("backoffice/home/index", {
    parentMenu: "master",
    isActive: true,
    subMenus
  });
};
