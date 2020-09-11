let express = require("express");
let router = express.Router();
let models = require("../models");
// router.use(express.urlencoded({ extended: true }));

// GET route to display all products
router.get("/", async (req, res) => {
  let user_id = req.session.userid;
  let balance = await models.Order.sum("price", {
    where: { user_id: user_id },
  });
  let quantity = await models.Order.count({
    where: { user_id: user_id },
  });
  let products = await models.Product.findAll();
  res.render("index", {
    allProducts: products,
    balance: balance,
    quantity: quantity,
    is_admin: req.session.is_admin,
  });
});

module.exports = router;
