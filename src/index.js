const express = require("express");
require("dotenv").config();
const models = require("./db");
const categoriesRouter = require("./services/categories");
const authorsRouter = require("./services/authors");
const reviewsRouter = require("./services/reviews");
const articlesRouter = require("./services/articles");
const server = express();

const cors = require("cors");

server.use(cors());

server.use(express.json());
server.use("/categories", categoriesRouter);
server.use("/authors", authorsRouter);
server.use("/reviews", reviewsRouter);
server.use("/articles", articlesRouter);
models.sequelize
  .sync({ force: true }) //{force:true} to drop all tables before creating

  .then((result) => {
    server.listen(process.env.PORT || 3002, () =>
      console.log("Running on port " + process.env.PORT)
    );
  })
  .catch((e) => console.log(e));
