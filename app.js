const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.render(`index.ejs`);
});

// ROUTE
app.get("/login", (req, res) => {});
app.listen(3030);
