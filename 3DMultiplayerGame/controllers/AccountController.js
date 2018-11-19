const express = require("express");
const router = express.Router();
const AccountModel = require("../models/AccountModel.js");


/**
 * GET:/Account/register.html
 */
router.get("/register.html?:validationError", (req, res) => {

  if (!res.local.auth) {
    res.render("Account/register", AccountModel.GetModel(res));
  } else {
    res.redirect("/");
  }
});

/**
 * GET:/Account/login.html
 */
router.get("/login.html?:validationError", (req, res) => {

  if (!res.local.auth) {
    res.render("Account/login", AccountModel.GetModel(res));
  } else {
    res.redirect("/");
  }
});

/**
 * GET:/Account/dashboard.html
 */
router.get("/dashboard.html", (req, res) => {

  if (res.local.auth) {
    res.render("Account/dashboard", AccountModel.GetModel(res));
  } else {
    res.redirect("/Account/login.html");
  }
});

module.exports = router;
