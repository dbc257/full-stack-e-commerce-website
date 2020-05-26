let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.render("admin");
});

router.post("/", (req, res) => {
  let image = req.body.bookImage;
  let title = req.body.bookTitle;
  let author = req.body.bookAuthor;
  let category = req.body.bookCategory;
  let description = req.body.bookDescription;
  let ISBN_10 = req.body.bookISBN_10;
  let price = req.body.bookPrice;
  let product = models.Post.build({
    image: image,
    title: title,
    author: author,
    category: category,
    description: description,
    ISBN_10: ISBN_10,
    price: price,
  });
  product.save().then((products) => {
    res.render("admin", products);
  });
});

module.exports = router;
