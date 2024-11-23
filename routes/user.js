const express = require("express");
const router = express.Router();
const User = require("/Users/malharkarkhanis/Desktop/Major/models/user.js");
const wrapAsync = require("/Users/malharkarkhanis/Desktop/Major/utils/wrapAsync.js");

const passport = require("passport");







router.get("/signup", (req, res) => {
    res.render("users/signup"); // Use relative path
});

router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "Welcome to Plankaro");
        res.redirect("/listings");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login.ejs"); // Use relative path
});

router.post("/login",passport.authenticate("local", { failureRedirect: "/login" }),async(req,res)=>{

    req.flash("success","Welcome back to WanderLust!");


    res.redirect("/listings");

})






module.exports=router;



