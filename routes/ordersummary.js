let express = require("express");
let router = express.Router();
// GET route to display Order Summary Page

// router.get("/", auth, (req, res) => {
//   let userProducts = orderArray.filter(
//     (orderProduct) => orderProduct.username == req.session.username
//   );
//   res.render("ordersummary", {
//     userProducts: products,
//     username: req.session.username,
//   });
// });

// app.post("/", (req, res) => {
//   let category = req.body.pick;
//   models.Post.findAll({
//     where: {
//       category: category,
//     },
//   }).then((filterResult) =>
//     res.render("filter", { productFilter: filterResult })
//   );
// });

// POST route to add a product to Order Summary Page

// router.post("/", (req, res) => {
//   let title = req.body.title;
//   let category = req.body.category;
//   let price = req.body.price;
//   let username = req.session.username;
//   let userProduct = {
//     title: title,
//     category: category,
//     price: price,
//     username: username,
//   };
//   req.session.price += parseFloat(price);
//   req.session.itemCount += 1;
//   orderArray.push(userProduct);
//   res.redirect("/ordersummary");
// });

module.exports = router;
