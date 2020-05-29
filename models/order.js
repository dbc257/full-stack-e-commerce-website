"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
    },
    {}
  );
  Order.associate = function (models) {
    models.Order.belongsTo(models.Product, {
      as: "order_products",
      foreignKey: "product_id",
    });
  };
  return Order;
};
