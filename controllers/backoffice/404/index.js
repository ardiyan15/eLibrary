exports.get404 = (req, res, next) => {
  res.render("backoffice/404/index", {
    parentMenu: "",
    isActive: false,
  });
};
