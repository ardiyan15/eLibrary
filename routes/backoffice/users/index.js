const express = require("express");
const router = express.Router();

const userController = require("../../../controllers/backoffice/users/index");
const isAuth = require("../../../middleware/is-auth");

// router.get("/users", isAuth, userController.getUsers);
router.get("/users", userController.getUsers);

router.get("/users/form", userController.getAddUser);

router.get("/users/:id", userController.getUser);

router.get("/users/detail/:id", userController.getDetailUser);

router.post("/users", userController.saveUser);

router.post("/updateuser/:id", userController.updateUser);

router.post("/userdelete/", isAuth, userController.deleteUser);

module.exports = { router };
