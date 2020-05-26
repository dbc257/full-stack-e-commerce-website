let express = require("express");
let router = express.Router();
let models = require("../models");

router.get("/", (req, res) => {
  res.render("admin");
});

router.post("/", (req, res) => {
  let image = req.body.bookImage;
  let title = req.body.bookTitle;
  let author = req.body.bookAuthor;
  let category = req.body.bookCategory;
  let description = req.body.bookDescription;
  let isbn_10 = req.body.bookISBN_10;
  let price = req.body.bookPrice;
  let product = models.Product.build({
    image: image,
    title: title,
    author: author,
    category: category,
    description: description,
    isbn_10: isbn_10,
    price: price,
  });

  console.log(product);
  product.save().then((products) => {
    res.render("admin", products);
  });
});

module.exports = router;
