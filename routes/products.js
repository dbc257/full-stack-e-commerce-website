let express = require("express");
let router = express.Router();
let models = require("../models");

// GET route to display all products
router.get("/", (req, res) => {
  models.Product.findAll().then((products) => {
    res.render("products", { allProducts: products });
  });
});
// POST route to add a product to Order Summary Page
router.post("/", (req, res) => {
  let product_id = req.body.product_id;
  let user_id = req.session.userid;
  let order = models.Order.build({
    product_id: product_id,
    user_id: user_id,
  });
  order.save().then(() => {
    res.redirect("/products");
  });
});

module.exports = router;
