let express = require("express");
let router = express.Router();
let models = require("../models");
// const keys = require("../config/keys");
// const stripe = require("stripe")(keys.stripeSecretKey);

// GET route to display Cart
router.get("/", async (req, res) => {
  let user_id = req.session.userid;
  let balance = await models.Order.sum("price", {
    where: { user_id: user_id },
  });
  let quantity = await models.Order.count({
    where: { user_id: user_id },
  });
  let results = await models.Order.findAll({
    where: {
      user_id: user_id,
    },
    include: [
      {
        model: models.Product,
        as: "order_products",
      },
    ],
  });
  let myProducts = results.map((o) => {
    return {
      order_id: o.dataValues.id,
      product: o.order_products.dataValues,
    };
  });
  res.render("cart", {
    userOrders: myProducts,
    balance: balance,
    quantity: quantity,
  });
});

// POST route to add a product to Cart
router.post("/", (req, res) => {
  let price = req.body.price;
  let product_id = req.body.product_id;
  let user_id = req.session.userid;
  let order = models.Order.build({
    product_id: product_id,
    user_id: user_id,
    price: price,
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
