const express 			= require("express"),
	  bodyParser 		= require("body-parser"),
	  mongoose 			= require("mongoose"),
	  app 				= express(),
	  flash			    = require("connect-flash"),
  	  methodOverride 	= require("method-override"),
	  expressSanitizer 	= require("express-sanitizer"),
	  Word				= require("./models/word.js"),
	  Form              = require("./models/form.js"),
	  User              = require("./models/user.js"),
	  dotEnv            = require("dotenv").config();
	 
//const MongoClient 		= require('mongodb').MongoClient;

const passport 			= require("passport"),
	  LocalStrategy     = require("passport-local")
	  

//Requiring Routes
const wordRoutes = require("./routes/words"),
	  formRoutes = require("./routes/forms"),
	  authRoutes = require("./routes/auth");

const mongo = process.env.mongo;

mongoose.connect("mongodb+srv://michael:wenger49@cluster0.uxhya.mongodb.net/vokoban1?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// APP CONFIGURATION
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // So we can serve custom style sheets - good practice for express
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); // MUST BE AFTER BODYPARSER
app.use(methodOverride("_method")); // _METHOD IS USED HERE - CAN BE ANYTHING
mongoose.set('useFindAndModify', false); // THIS IS JUST TO STOP SOME ODD ERROR TURNING UP ABOUT DEPRECATION
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "shadow", //THIS SECRET CAN BE ANYTHING YOU WANT
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//These methods all come for free with passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//These are passed to every single template - 'currentUser' and 'message'
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 		req.flash("error", "Please Login First!");
// 		res.redirect("/login");
// };

app.use("/", authRoutes);
app.use("/words", wordRoutes);
app.use("/words/:id/forms", formRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});