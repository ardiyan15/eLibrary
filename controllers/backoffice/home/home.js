exports.getHome = async (req, res, next) => {
  // if (!req.session.backOffice) {
  //   if (!req.session.backOffice || req.session.backOffice.roles != "admin") {
  //     return res.redirect("/backoffice");
  //   }
  // }

  res.render("backoffice/home/index", {
    parentMenu: "dashboard",
    subMenuName: "menu",
    isActive: true,
  });
};
