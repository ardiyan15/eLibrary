const encrypted = require("../../../util/encrypted");
const Category = require("../../../models/backoffice/categories/category");
const moment = require("moment");

exports.getCategories = (req, res, next) => {
  const flashMessage = req.flash("success");
  Category.findAll({
    order: [["id", "DESC"]],
  })
    .then((categories) => {
      res.render("backoffice/categories/index", {
        categories,
        encrypt: encrypted.encrypt,
        flashMessage,
        moment,
      });
    })
    .catch((err) => console.log(err));
};

exports.addCategory = (req, res, next) => {
  res.render("backoffice/categories/form", {
    formTitle: "Add Category",
    user: "",
    buttonText: "Submit",
  });
};

exports.saveCategory = async (req, res, next) => {
  const { code, description } = req.body;

  await Category.create({
    code,
    description,
  });

  req.flash("success", "Successfully Add Category");
  res.redirect("/backoffice/categories");
};

exports.deleteCategory = async (req, res, next) => {
  const { categoryId } = req.body;

  let idCategoryDecrypted = encrypted.decrypt(categoryId);

  console.log(idCategoryDecrypted);
  let category = await Category.findByPk(idCategoryDecrypted);

  category.destroy();
  req.flash("success", "Successfully delete category");
  res.redirect("/backoffice/categories");
};

exports.getCategory = async (req, res, next) => {
  const categoryId = encrypted.decrypt(req.params.id);

  let category = await Category.findByPk(categoryId);
  let categoryIdEncrypted = encrypted.encrypt(category.id.toString());

  res.render("backoffice/categories/form", {
    formTitle: "Edit Category",
    buttonText: "Submit",
    category,
    categoryIdEncrypted,
  });
};

exports.updateCategory = async (req, res, next) => {
  const { id, code, description } = req.body;
  let categoryEncrypted = encrypted.decrypt(id);

  let category = await Category.findByPk(categoryEncrypted);

  category.code = code;
  category.descripiton = description;
  category.save();

  req.flash("success", "Successfully update category");
  res.redirect("/backoffice/categories");
};
