const Sequelize = require("sequelize");

const sequelize = require("../../../util/database");

const Book = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING(60),
  author: Sequelize.STRING(100),
  category: Sequelize.STRING(50),
  description: Sequelize.TEXT,
  image: Sequelize.STRING(128),
  isbn: Sequelize.STRING(13),
  publication_date: Sequelize.DATEONLY,
  publisher: Sequelize.STRING(100),
  language: Sequelize.STRING(80),
  number_of_pages: Sequelize.STRING(10),
  heavy: Sequelize.FLOAT,
  width: Sequelize.FLOAT,
  length: Sequelize.FLOAT,
  isBorrow: Sequelize.BOOLEAN,
});

module.exports = Book;
