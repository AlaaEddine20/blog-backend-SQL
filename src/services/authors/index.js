const express = require("express");
const Author = require("../../db").Author;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const authors = await Author.findAll();
      res.send(authors);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newAuthor = await Author.create(req.body);
      res.send(newAuthor);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route(":/id")
  .get(async (req, res, next) => {
    try {
      const author = await Author.findByPk(req.params.id);
      res.send(author);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedAuthor = await Author.update(req.body, {
        where: { id: req.params.id },
        returning: true, //to return updated obj
        plain: true,
      });
      res.send(updatedAuthor[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Author.destroy({ where: { id: req.params.id } }).then(
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
