const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const users = [];

app.use(express.urlencoded({ extended: false })); // help to access the data from the  which are coming through the post method

app.post("/register", async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10); // we are converting the passward into the hash password(decrypted form )
    // Pushing the data in the users array
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    });
    console.log(users);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    // res.send(err);
    res.redirect("/register");
  }
});

// ROUTEs
app.get("/", (req, res) => {
  res.render(`index.ejs`);
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
console.log(users);

// END Routes
app.listen(3030);
