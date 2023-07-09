const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { encrypt, decrypt } = require("../../../util/encrypted");
const encrypted = require("../../../util/encrypted");
const sequelize = require("../../../util/database");
const Book = require("../../../models/backoffice/books/book");
const Rating = require("../../../models/frontoffice/rating");
const Banner = require("../../../models/backoffice/banners/banner");
const Transaction_detail = require("../../../models/backoffice/transaction_details/transaction_details");

exports.getHome = async (req, res, next) => {
  let isLoggedIn = false;
  if (req.session.frontOffice) {
    if (req.session.frontOffice.user) {
      isLoggedIn = true;
      user = req.session.frontOffice.user;
      user.id = encrypt(user.id.toString());
    }
  }

  try {
    const Books = await Book.findAll({
      attributes: ["*"],
      raw: true,
      nest: true,
      include: [
        {
          model: Rating,
          attributes: [
            [sequelize.fn("COUNT", sequelize.col("rate")), "total_review"],
          ],
          required: true, // true to force to using inner join
        },
      ],
      group: "bookId",
    });

    const Banners = await Banner.findAll({
      raw: true,
      where: {
        type: "Website",
      },
    });

    let results = [];
    let index = 0;
    let idEncrypted = "";
    let categories = [];

    Books.forEach((book) => {
      idEncrypted = encrypt(book.id.toString());
      if (results.length == 0) {
        categories.push(book.category);
        results.push({
          category: book.category,
          book: [
            {
              id: idEncrypted,
              title: book.title,
              author: book.author,
              description: book.description,
              image: book.image,
              createdAt: book.createdAt,
              totalReview: book.ratings.total_review,
            },
          ],
        });
      } else {
        if (book.category == results[index].category) {
          results[index].book.push({
            id: idEncrypted,
            title: book.title,
            author: book.author,
            description: book.description,
            image: book.image,
            createdAt: book.createdAt,
            totalReview: book.ratings.total_review,
          });
        } else if (!categories.includes(book.category)) {
          categories.push(book.category);
          results.push({
            category: book.category,
            book: [
              {
                id: idEncrypted,
                title: book.title,
                author: book.author,
                description: book.description,
                image: book.image,
                createdAt: book.createdAt,
                totalReview: book.ratings.total_review,
              },
            ],
          });
          index++;
        } else if (categories.includes(book.category)) {
          categories.forEach((category) => {
            results.find((result) => {
              if (result.category === category && result.book.length == 4) {
                result.book.pop();
                result.book.unshift({
                  id: idEncrypted,
                  title: book.title,
                  author: book.author,
                  description: book.description,
                  image: book.image,
                  createdAt: book.createdAt,
                  totalReview: book.ratings.total_review,
                });
              }
            });
          });
        }
      }
    });
    res.render("frontoffice/home/index", {
      isLoggedIn,
      results,
      Banners,
      encrypt,
    });
  } catch (err) {
    res.render("frontoffice/error", {
      message: err.stack,
    });
  }
};

exports.getBookByCategories = (req, res, next) => {
  const category = decrypt(req.params.category);
  let isLoggedIn = false;

  if (req.session.user) {
    isLoggedIn = true;
    user = req.session.user;
    user.id = encrypt(user.id.toString());
  }

  Book.findAll({
    raw: true,
    where: { category },
  })
    .then((results) => {
      res.render("frontoffice/home/categories", {
        isLoggedIn,
        results,
      });
    })
    .catch((err) => {
      res.render("frontoffice/error", {
        message: err.stack,
      });
    });
};

exports.searchBook = (req, res, next) => {
  const { search } = req.body;

  Book.findAll({
    raw: true,
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          category: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  })
    .then((results) => {
      res.render("frontoffice/home/search", {
        search,
        results,
      });
    })
    .catch((err) => console.log(err));
};

exports.saveReview = (req, res, next) => {
  const { rate, review, userId, bookId } = req.body;

  console.log(userId);
  console.log(bookId);

  let bookIdDecrypted = encrypted.decrypt(bookId);
  let userIdDecrypted = encrypted.decrypt(userId);

  console.log(userId);
  console.log(userIdDecrypted);

  Rating.create({
    rate,
    review,
    userId: userIdDecrypted,
    bookId: bookIdDecrypted,
  })
    .then((result) => {
      req.flash("success", "Successfully submit review");
      res.redirect("back");
    })
    .catch((err) => {
      console.log(err);
      res.render("frontoffice/error", {
        message: err.stack,
      });
    });
};
