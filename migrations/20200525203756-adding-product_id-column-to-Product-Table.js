"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Products", "product_id", {
      type: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Products", "product_id");
  },
};
