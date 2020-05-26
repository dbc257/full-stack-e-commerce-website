"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      isbn_10: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
    },
    {}
  );
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};
