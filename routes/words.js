const express = require("express"),
      router  = express.Router(),
	  Word    = require("../models/word");
	
// INDEX ROUTE
router.get("/", function(req, res){
	//This is the search bar funtionality - FUZZY SEARCH
	if(req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Word.find({english: regex}, function(err, words){
			if(err){
				console.log(err)
			} else {
				res.render("words/index", {words: words,});
			}
	});
	} else {
		Word.find({}, function(err, words){
			if(err){
				console.log(err);
			} else {
				res.render("words/index", {words: words, currentUser: req.user});
			}
		});
}});

//NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
	res.render("words/new");
})

//CREATE ROUTE
router.post("/", isLoggedIn, function(req,res){
	Word.create(req.body.word, function(err, newWord){
		if(err){
			res.render("words/new");
		} else {
			//Giving author credentials to the flashcard
			newWord.author.id = req.user._id;
			newWord.author.username = req.user.username;
			newWord.save()
			res.redirect("/words")
		}
	}
)});

//SHOW ROUTE
router.get("/:id", function(req, res){
	Word.findById(req.params.id).populate("forms").exec(function(err, foundWord){
		if(err){
			res.redirect("/words");
		} else {
			res.render("words/show", {word: foundWord});
		}
	});
});

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, function(req, res){
	Word.findById(req.params.id, function(err, foundWord){
		if(err){
			res.redirect("/words");
		} else {
			res.render("words/edit", {word: foundWord})
		}
	})
});

//UPDATE ROUTE
router.put("/:id", isLoggedIn, function(req,res){
	Word.findByIdAndUpdate(req.params.id, req.body.word, function(err, updatedWord){
		if(err){
			res.redirect("/words");
		} else {
			res.redirect("/words/" + req.params.id);
		}
	})
})

//DESTROY ROUTE
router.delete("/:id", isLoggedIn, function(req, res){
	Word.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/words");
		} else {
			req.flash("success", "Card deleted");
			res.redirect("/words");
		}
	});
});

//Fuzzy Search 
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
};

module.exports = router;