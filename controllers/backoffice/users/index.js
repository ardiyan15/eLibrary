const User = require("../../../models/backoffice/users/user");
const Menu = require("../../../models/backoffice/menus/menu");
const SubMenu = require("../../../models/backoffice/sub_menus/sub_menus");
const UserPrivilege = require("../../../models/backoffice/userPrivilege/userPrivilege");

const bcrypt = require("bcryptjs");
const encrypted = require("../../../util/encrypted");
const sequelize = require("../../../util/database");

exports.getUsers = async (req, res, next) => {
  const flashMessage = req.flash("success");

  let users = await User.findAll({
    order: [["id", "DESC"]],
  });

  res.render("backoffice/users/index", {
    users,
    encrypt: encrypted.encrypt,
    flashMessage,
    parentMenu: "master_data",
    subMenuName: "users",
    isActive: true,
  });
};

exports.getAddUser = async (req, res, next) => {
  const menuData = await Menu.findAll({
    nest: true,
    include: [
      {
        required: true,
        all: true,
        nested: true,
        model: SubMenu,
      },
    ],
  });

  res.render("backoffice/users/form", {
    formTitle: "Add User",
    buttonText: "Submit",
    parentMenu: "master_data",
    subMenuName: "users",
    isActive: true,
    user: [],
    menuData,
  });
};

exports.getUser = (req, res, next) => {
  const userId = encrypted.decrypt(req.params.id, req.params.id);

  User.findByPk(userId, {
    raw: true,
  })
    .then((user) => {
      let userIdEncrypted = encrypted.encrypt(userId);
      res.render("backoffice/users/form", {
        formTitle: "Edit User",
        buttonText: "Update",
        parentMenu: "master_data",
        subMenuName: "users",
        user,
        userIdEncrypted,
        isActive: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getDetailUser = async (req, res, next) => {
  const { id } = req.params;

  const userIdDecrypted = encrypted.decrypt(id);

  const user = await User.findByPk(userIdDecrypted, {
    raw: true,
  });

  res.render("backoffice/users/detail", {
    user,
    isActive: true,
    parentMenu: "master_data",
    subMenuName: "users",
  });
};

exports.saveUser = async (req, res, next) => {
  let menuIds = req.body.menu_ids;

  const { username, password, roles, email } = req.body;
  const passwordHashed = await bcrypt.hash(password, 12);
  const image = req.file;

  // console.log(image.path);

  // return;

  const imageUrl = image.path;

  const dbTransaction = await sequelize.transaction();

  try {
    const user = await User.create(
      {
        username,
        password: passwordHashed,
        roles,
        email,
        image: imageUrl,
      },
      { transaction: dbTransaction }
    );

    let testData = [
      {
        subMenuId: 1,
        userId: user.id,
        access: "test",
      },
      {
        subMenuId: 2,
        userId: user.id,
        access: "test",
      },
      {
        subMenuId: 3,
        userId: user.id,
        access: "test",
      },
    ];

    await UserPrivilege.bulkCreate(testData, {
      transaction: dbTransaction,
    });

    // console.log(test1)
    // return
    // await menuIds.forEach(menuId => {
    //   // SubMenu.create({

    //   // })
    // })

    dbTransaction.commit();
    return;
  } catch (err) {
    console.log(err);
    dbTransaction.rollback();
  }

  // const { username, password, roles, email } = req.body;

  // const passwordHashed = await bcrypt.hash(password, 12);

  // const image = req.file;

  // const imageUrl = image.path;

  // try {
  //   await User.create({
  //     username,
  //     password: passwordHashed,
  //     roles,
  //     email,
  //     image: imageUrl,
  //   });

  //   // UserPrivilege.create({
  //   //   sub_menu_id: '1',

  //   // })
  //   req.flash("success", "Successfully Add User");
  //   res.redirect("/backoffice/users");
  // } catch (err) {
  //   console.log(err);
  // }
};

exports.updateUser = async (req, res, next) => {
  const { id, username, password, roles, email } = req.body;

  let userDecrypted = encrypted.decrypt(id);
  let user = await User.findByPk(userDecrypted);

  try {
    user.username = username;
    if (password) {
      user.password = password;
    }
    user.roles = roles;
    user.email = email;
    user.save();

    req.flash("success", "Successfully update user");
    res.redirect("/backoffice/users");
  } catch (err) {
    throw err;
  }
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.body;

  let userIdDecrypted = encrypted.decrypt(userId);

  User.findByPk(userIdDecrypted)
    .then((user) => {
      return user.destroy();
    })
    .then(() => {
      req.flash("success", "Successfully delete user");
      res.redirect("/backoffice/users");
    })
    .catch((err) => console.log(err));
};
