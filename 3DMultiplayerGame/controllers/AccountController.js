const express = require("express");
const router = express.Router();
const AccountModel = require("../models/AccountModel.js");
const Shared = require("../helpers/Shared.js");
const permit = require("../middleware/permit.js");


/**
 * GET:/Account/register.html
 */
router.get("/register.html", permit(["public"]), (req, res) => {
    res.render("Account/register", Shared.getModel(res,AccountModel));
});

/**
 * POST:/Account/register.html
 */
router.post("/register.html", permit(["public"]),(req, res) => {

    let submission = req.body;

    let account = new AccountModel(submission);

    account.save((err) => {
        if (err) {
            res.user.error = err.errors;
            res.render("Account/register", Shared.getModel(res,AccountModel));
        } else {
            res.redirect("/Account/login.html");
        }
    });
});

/**
 * GET:/Account/login.html
 */
router.get("/login.html", permit(["public"]), (req, res) => {
        res.render("Account/login", Shared.getModel(res,AccountModel));
});

/**
 * POST:/Account/login.html
 */
router.post("/login.html", permit(["public"]), (req, res) => {

    let password = req.body.password;
    let username = req.body.username;

    AccountModel.ValidateLogin(username, password, (err) => {
        if (err) {
            res.user.error = err.error;
            err.error = null;
            return res.render("Account/login", Shared.getModel(res,AccountModel));
        } else {

            let payload = {
                auth: true,
                username: username,
                role: "user",
                exp: (Math.floor(Date.now() / 1000) + 60) * 24
            };

            let token = Shared.tokenGen(payload)

            res.cookie("WWW-Authenticate", token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
            });

            return res.redirect("/Account/dashboard.html");
        }
    })
});

/**
 * GET:/Account/dashboard.html
 */
router.get("/dashboard.html", permit(["user", "admin"], "/Account/login.html"), (req, res) => {
        res.render("Account/dashboard", Shared.getModel(res,AccountModel));
});

/**
 * GET:/Account/logout
 */
router.get("/logout.html", (req, res) => {
    res.clearCookie("WWW-Authenticate");
    res.redirect("/");
});

module.exports = router;
