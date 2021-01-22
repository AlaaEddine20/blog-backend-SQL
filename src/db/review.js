module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("reviews", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      required: true,
    },
    claps: {
      type: DataTypes.INTEGER,
      required: true,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Author);
    Review.belongsTo(models.Article);
  };
  return Review;
};
