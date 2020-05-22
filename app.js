onst express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const models = require("./models");
app.use(express.urlencoded());
// tell express to use mustache templating engine
app.engine("mustache", mustacheExpress());
// the pages are located in views directory
app.set("views", "./views");
// extension will be .mustache
app.set("view engine", "mustache");



// Check to see if the server is running
app.listen(3000, () => {
    console.log("Server is on the run!");
  });