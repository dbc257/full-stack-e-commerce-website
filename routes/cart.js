let express = require("express");
let router = express.Router();
let models = require("../models");

// GET route to display Cart
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
      // console.log(o.order_products.dataValues);
      return {
        order_id: o.dataValues.id,
        product: o.order_products.dataValues,
      };
    });
    // console.log(myProducts);
    res.render("cart", {
      userOrders: myProducts,
    });
  });
});

// POST route to add a product to Cart
router.post("/", (req, res) => {
  let product_id = req.body.product_id;
  let user_id = req.session.userid;
  let order = models.Order.build({
    product_id: product_id,
    user_id: user_id,
  });
  order.save().then(() => {
    res.redirect("/cart");
  });
});

// POST route to remove a product from Order Summary Page
router.post("/remove", (req, res) => {
  let order_id = req.body.order_id;
  console.log("Button works");
  models.Order.destroy({
    where: {
      id: order_id,
    },
  }).then(() => {
    res.redirect("/cart");
  });
});

module.exports = router;
