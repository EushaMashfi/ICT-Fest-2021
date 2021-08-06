const express = require("express");
const router = express.Router();
const {
    ensureAuthenticated,
    addUserData,
} = require("./../middlewares/auth.middleware");

router.get("/", (req, res) => {
    res.render("welcome.ejs");
});

router.get("/dashboard", ensureAuthenticated, addUserData, (req, res) => {
    //    console.log(req.user); //it has all the info of user
    res.render("dashboard.ejs", { user: req.user });
});

module.exports = router;
