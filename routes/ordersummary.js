let express = require("express");
let router = express.Router();
let models = require("../models");
// GET route to display Order Summary Page
router.get("/", (req, res) => {
  models.Order.findAll({
    where: {
      user_id: 1,
    },
  }).then((user_order) => {
    let order_id = user_order.map((o) => {
      return o.dataValues.product_id;
    });
    console.log(order_id);
    models.Product.findAll({
      where: {
        id: order_id,
      },
    }).then((order_products) => {
      res.render("ordersummary", {
        userOrders: order_products,
        username: req.session.username,
      });
    });
  });
});
// POST route to remove a product from Order Summary Page
router.post("/remove", (req, res) => {
  let order_id = req.body.order_id;
  models.Order.destroy({
    where: {
      id: order_id,
    },
  }).then(() => {
    res.render("ordersummary");
  });
});

module.exports = router;
