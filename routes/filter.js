let express = require("express");
let router = express.Router();
let models = require("../models");

// GET route to display filter page
router.get("/", (req, res) => {
  res.render("filter");
});
// POST route to filter by category
app.post("/", (req, res) => {
  let category = req.body.pick;
  models.Post.findAll({
    where: {
      category: category,
    },
  }).then((filterResult) =>
    res.render("filter", { productFilter: filterResult })
  );
});
module.exports = router;
