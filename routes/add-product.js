let express = require("express");
let router = express.Router();
let models = require("../models");

// GET route to display the add-post page
router.get("/", (req, res) => {
  res.render("add-product");
});

// POST route to save a new product
router.post("/", (req, res) => {
  let image = req.body.bookImage;
  let title = req.body.bookTitle;
  let author = req.body.bookAuthor;
  let category = req.body.bookCategory;
  let description = req.body.bookDescription;
  let ISBN_10 = req.body.bookISBN_10;
  let price = req.body.bookPrice;
  let product = models.Product.build({
    image: image,
    title: title,
    author: author,
    category: category,
    description: description,
    ISBN_10: ISBN_10,
    price: price,
  });
  product.save().then(() => {
    res.render("add-product", { title: title });
  });
});

module.exports = router;
