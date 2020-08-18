let express = require("express");
let router = express.Router();
let models = require("../models");

// GET route to display product details
router.get("/", (req, res) => {
  res.render("detail");
});

// POST route to add a product to Order Summary Page
router.post("/", (req, res) => {
  let detail_id = req.body.bookID;
  models.Product.findByPk(detail_id).then((book) => {
    let bookArray = [book.dataValues];
    res.render("detail", { bookDetails: bookArray });
  });
});

module.exports = router;
