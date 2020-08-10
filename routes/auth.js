const express = require("express"),
	  router  = express.Router(),
	  passport= require("passport"),
	  User    = require("../models/user")
	  
// LANDING
router.get("/", function(req, res){
	res.redirect("/landing");
});

router.get("/landing", function(req, res){
	res.render("landing")
})

//AUTH ROUTES

//Register Routes
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message)
			return res.render("register")
		} 
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to VokoBan " + user.username)
			res.redirect("/words")
		})
	})
})


//Login Routes
router.get("/login", function(req, res){
	res.render("login");
});

//The middleware handles the login logic checking whether the user exists and matches password
router.post("/login", passport.authenticate("local", 
		{
			successRedirect: "/words", 
			failureRedirect: "/login"
		}), function(req, res){
});


//Lougout Route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully logged out")
	res.redirect("/landing")
})


module.exports = router;