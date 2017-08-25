var express         = require('express'),
  bodyParser        = require('body-parser'),
  app               = express(),
  mongoose          = require('mongoose'),
  Campground        = require('./models/campground'),
  myComment         = require('./models/comment'),
  passport          = require('passport'),
  LocalStrategy     = require('passport-local'),
  User              = require("./models/user"),
  seedDB            = require('./seeds');
//Require Routes 
var commentRoutes   = require("./routes/comments"),
  campgroundRoutes  = require("./routes/campgrounds"),
  indexRoutes       = require("./routes/index");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
//link our style sheet
app.use(express.static(__dirname +"/public"));
app.set("view engine", "ejs");
seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "this is a secret password",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
//schema for mongoose


app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function(){
  console.log("YelpCamp server started");
});
