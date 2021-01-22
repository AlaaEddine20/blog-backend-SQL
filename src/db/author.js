module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("author", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    imgUrl: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  Author.associate = (models) => {
    Author.hasMany(models.Article);
    Author.hasMany(models.Review);
  };
  return Author;
};
