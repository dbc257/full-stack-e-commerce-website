"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
    },
    {}
  );
  User.associate = function (models) {
    // models.User.hasMany(models.Product, {
    //   as: "products",
    //   foreignKey: "product_id",
    // });
  };
  return User;
};
