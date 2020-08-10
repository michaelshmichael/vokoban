const express = require("express"),
	  //KEY OBJECT TO MERGE IDS INTO THE FORMS ROUTE - OTHERWISE IT WILL NOT BE READABLE
	  router  = express.Router({mergeParams: true}),
	  Word	  = require("../models/word"),
	  Form    = require("../models/form")

//NEW ROUTE
router.get("/new", function(req, res){
	Word.findById(req.params.id, function(err, word){
		if(err){
			console.log(err);
		} else {
			res.render("forms/new", {word: word});
		}
	})
})

//CREATE ROUTE
router.post("/", function(req, res){
	Word.findById(req.params.id, function(err, word){
		if(err){
			console.log(err);
			res.redirect("/words");
		} else {
			Form.create(req.body.form, function(err, form){
				if(err){
					console.log(err);
				} else {
					word.forms.push(form);
					word.save();
					res.redirect("/words/" + word._id)
				}
			})
		}
	})
});

//EDIT ROUTE
router.get("/:form_id/edit", function(req, res){
	Form.findById(req.params.form_id, function(err, foundForm){
		if(err){
			res.redirect("back");
		} else {
			res.render("forms/edit", {word_id: req.params.id, form: foundForm});
		}	
	});
});

//UPDATE ROUTE
router.put("/:form_id", function(req, res){
	Form.findByIdAndUpdate(req.params.form_id, req.body.form, function(err, updatedForm){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/words/" + req.params.id)
		};
	});
});

// //DESTROY ROUTE
router.delete("/:form_id", function(req, res){
	Form.findByIdAndDelete(req.params.form_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/words/" + req.params.id);
		}
	});
});


module.exports = router;