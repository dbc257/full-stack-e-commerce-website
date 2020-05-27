let express = require("express");
let router = express.Router();
let models = require("../models");
// GET route to display Order Summary Page
router.get("/", (req, res) => {
  let user_id = req.session.userid;
  models.Order.findAll({
    where: {
      user_id: user_id,
    },
    include: [
      {
        model: models.Product,
        as: "order_products",
      },
    ],
  }).then((results) => {
    let myProducts = results.map((o) => {
      // console.log(o.dataValues.id);
      return {
        order_id: o.dataValues.id,
        product: o.dataValues.order_products.dataValues,
      };
    });
    console.log(myProducts);
    res.render("ordersummary", {
      userOrders: myProducts,
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
    res.redirect("/ordersummary");
  });
});

module.exports = router;
