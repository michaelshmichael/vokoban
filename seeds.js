const mongoose = require("mongoose");
const Word 	   = require("./models/word");
const Form	   = require("./models/form")

const data = [
	{
		english: "senile",
		russian: "marazmatnik",
		example: "sheissenile",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPZYS1j_TbRpJ3f67mZMYeDjPwY00YTziC9w&usqp=CAU"
	},
	{
		english: "trigger",
		russian: "kurok",
		example: "pull the trigger",
		image: "https://www.mcarbo.com/Shared/Images/Product/KEL-TEC-KSG-Target-Trigger/KSG-Trigger-Upgrade-Aluminum.jpg"
	}
]

function seedDB(){
	//Remove all words
	Word.remove({}, function(err,){
		if(err){
			console.log(err);
		}
		console.log("All removed")
		//Add some words
		data.forEach(function(seed){
			Word.create(seed, function(err, word){
				if(err){
					console.log(err);
				} else {
					console.log("Added a campground");
					Form.create(
						{
							text: "blablabla",
							pos: "noun"
						}, function(err, form){
							if(err){
								console.log(err);
							} else {
								word.forms.push(form);
								word.save();
								console.log("Created new comment")
							}	
						}
					)
				}
			});
		});
	});
}

module.exports = seedDB;
 
 
// function seedDB(){
//    //Remove all campgrounds
//    Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
//     //add a few comments
// }
 
// module.exports = seedDB;

