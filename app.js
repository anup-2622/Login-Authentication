if (process.env.NODE_ENV !== "production ") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);
const users = [];

app.use(express.urlencoded({ extended: false })); // help to access the data from the  which are coming through the post method

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // we wont resave the session variable if nothing is changed
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// configuration for the loing post functionailty
app.post(
  "/login",
  checkUnAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

//configuration for the register post functionailty
app.post("/register", checkUnAuthenticated, async (req, res) => {
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
app.get("/", checkAuthenticated, (req, res) => {
  res.render(`index.ejs`, { name: req.user.name });
});

app.get("/login", checkUnAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/register", checkUnAuthenticated, (req, res) => {
  res.render("register.ejs");
});
console.log(users);

app.delete("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

// END Routes

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkUnAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
app.listen(3030);
