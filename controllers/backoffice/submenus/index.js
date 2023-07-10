exports.getSubMenus = async (req, res, next) => {
  res.render("backoffice/submenu/index", {
    flashMessage: "",
  });
};
