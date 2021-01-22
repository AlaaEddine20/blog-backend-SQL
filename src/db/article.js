module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    headline: {
      type: DataTypes.STRING,
      required: true,
    },
    subhead: {
      type: DataTypes.STRING,
      required: true,
    },
    content: {
      type: DataTypes.STRING,
      required: true,
    },
    cover: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  Article.associate = (models) => {
    Article.belongsTo(models.Category);
    Article.belongsTo(models.Author);
    Article.hasMany(models.Review);
  };
  return Article;
};
