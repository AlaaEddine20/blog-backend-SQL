const express = require("express");
const Category = require("../../db").Category;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const categories = await Category.findAll();
      res.send(categories);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newCategory = await Category.create(req.body);
      res.send(newCategory);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route(":/id")
  .get(async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.id);
      res.send(category);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedCategory = await Category.update(req.body, {
        where: { id: req.params.id },
        returning: true, //to return updated obj
        plain: true,
      });
      res.send(updatedCategory[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Category.destroy({ where: { id: req.params.id } }).then(
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
