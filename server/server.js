const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const {mongoose} = require("./db/mongoose.js");
const {URL} = require("./models/URL.js");
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
hbs.registerPartials(path.join(__dirname, "../views", "partials"));
app.get("/", (req, res) => {
  res.redirect("/urls");
})
app.get("/urls", (req, res) => {
  URL.find()
  .then(URLs => {
    res.render("index.hbs", {
      URLs
    });
  }, e => {
    res.status(404).send(e);
  })
})
app.get("/urls/new", (req, res) => {
  res.render("URLs/new.hbs");
})
app.get("/:short", (req, res) => {
  const short = req.params.short;
  URL.find({shortenedURL: short})
  .then(URL => {
    res.redirect(URL[0].originalURL);
  }, e => {
    res.status(404).send(e);
  })
})
app.post("/urls", (req, res) => {
  const newURL = new URL({
    shortenedURL: req.body.shortenedURL,
    originalURL: req.body.originalURL
  })
  newURL.save()
  .then(doc => {
    res.redirect("/");
  }, e => {
    res.status(404).send(e);
  })
})
app.listen(port);
