const express = require("express");
const Review = require("../../db").Review;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findAll();
      res.send(reviews);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newReview = await Review.create(req.body);
      res.send(newReview);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route(":/id")
  .get(async (req, res, next) => {
    try {
      const review = await Review.findByPk(req.params.id);
      res.send(review);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedReview = await Review.update(req.body, {
        where: { id: req.params.id },
        returning: true, //to return updated obj
        plain: true,
      });
      res.send(updatedReview[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Review.destroy({ where: { id: req.params.id } }).then(
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
