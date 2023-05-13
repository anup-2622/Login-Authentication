const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.render(`index.ejs`);
});

// ROUTE
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.listen(3030);
