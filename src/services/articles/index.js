const express = require("express");
const { Op } = require("sequelize");
const Article = require("../../db").Article;
const Category = require("../../db").Category;
const Review = require("../../db").Review;
const Author = require("../../db").Author;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const articles = await Article.findAll({
        include: [Author, Category, Review],
        where: req.params.headline
          ? { headline: { [Op.iLike]: "%" + req.query.headline + "%" } }
          : {},
      });
      res.send(articles);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newArticle = await Article.create(req.body);
      res.send(newArticle);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route(":/id")
  .get(async (req, res, next) => {
    try {
      const article = await Article.findByPk(req.params.id);
      res.send(article);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedArticle = await Article.update(req.body, {
        where: { id: req.params.id },
        returning: true, //to return updated obj
        plain: true,
      });
      res.send(updatedArticle[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Article.destroy({ where: { id: req.params.id } }).then(
        (rowsDeleted) => {
          if (rowsDeleted === 1) res.send("Deleted");
        }
      );
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
