const bcrypt = require("bcryptjs");
const User = require("../../../models/backoffice/users/user");
const Menu = require("../../../models/backoffice/menus/menu");
const SubMenu = require("../../../models/backoffice/sub_menus/sub_menus");
const Redis = require("../../../util/redis");
const passport = require("passport");
const Localstrategy = require("passport-local");

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

  // passport.use(
  //   new Localstrategy(async function verify(username, password, cb) {
  //     const user = await User.findOne({
  //       raw: true,
  //       where: { username: username },
  //     });

  //     if (!user) {
  //       return cb(null, false, { message: "Invalid username or password" });
  //     }

  //     const checkPassword = await bcrypt.compare(password, user.password);
  //     if (!checkPassword) {
  //       return cb(null, false, { message: "Invalid username or password" });
  //     }

  //     return cb(null, user);
  //   })
  // );

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
      // let passportResult = await passport.authenticate("local", {
      //   failureRedirect: "/backoffice",
      // });
      req.session.isLoggedIn = true;
      req.session.backOffice = user;
      // const menus = await Menu.findAll({
      //   raw: true,
      //   order: [["id", "DESC"]],
      // });

      // await Redis("menus", JSON.stringify(menus));

      // const subMenus = await SubMenu.findAll({
      //   raw: true,
      //   order: [["id", "DESC"]],
      // });

      // await Redis("sub_menus", JSON.stringify(subMenus));

      res.redirect("/backoffice/home");
    } else {
      req.flash("failed", "Invalid username or password");
      res.redirect("/backoffice");
    }
  }
};
