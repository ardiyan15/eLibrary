const bcrypt = require("bcryptjs");
const User = require("../../../models/backoffice/users/user");

exports.login = async (req, res, next) => {
  if (req.session.isLoggedIn && req.session.user == "admin") {
    return res.redirect("/backoffice/home");
  }

  const flashMessage = req.flash("failed");
  res.render("backoffice/auth/index", {
    csrfToken: req.csrfToken(),
    flashMessage,
    parentMenu: "",
    isActive: false,
  });
};

exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    raw: true,
    where: { username: username },
  });

  if (!user) {
    req.flash("failed", "Invalid username or password");
    res.redirect("/backoffice");
  } else {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      delete user.password;
      req.session.isLoggedIn = true;
      req.session.backOffice = user;

      res.redirect("/backoffice/home");
    } else {
      req.flash("failed", "Invalid username or password");
      res.redirect("/backoffice");
    }
  }
};
