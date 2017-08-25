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

app.get("/", function(req, res){
  res.render("landing");
});
//INDEX
app.get("/campgrounds", function(req, res){
  // console.log(req.user);
  Campground.find({}, function(err, allCampgrounds){
    if (err)
      console.log(err);
    else {
      res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
    }
  });
  //res.render("campgrounds", {campgrounds: campgrounds});
});
//CREATE
//To make routes RESTful, we use identical URLs for GET and POST
app.post("/campgrounds", function(req, res){
  //get form data and add to campgrounds array
  //redirect back to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function(err, newlyCreate){
    if (err){
      console.log(err);
    }
    else {
      res.redirect("/campgrounds"); //automatically redirects as GET
    }
  });
  //campgrounds.push(newCampground);
  //create new campground and save to DB

});
//NEW (show form). This MUST come before the campgrounds/:id because it follows that pattern!
app.get("/campgrounds/new", function(req, res){
  res.render('campgrounds/new');
});
//SHOW (more information about ONE campground)
app.get("/campgrounds/:id", function(req, res){
  //find page with that id, then show it.
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    }
    else {
      console.log(foundCampground);
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});


//=========================== COMMENTS ROUTES ===================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
  //lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      console.log(req.body.comment);
      myComment.create(req.body.comment, function(err, comment){
        if (err){
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/"+campground._id);
        }
      });
    }
  });
});
//===========
//AUTH ROUTES
//============
//show register form
app.get("/register", function(req, res){
  res.render("register");
});
//sign up logic
app.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});
//show login form
app.get("/login", function(req, res){
  res.render("login");
});
//handle login logic
app.post("/login", passport.authenticate("local",
    {successRedirect: "/campgrounds",
    failureRedirect: "/login"}),
    function(req, res){
});

//logout route
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/campgrounds");
});
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
app.listen(3000, function(){
  console.log("YelpCamp server started");
});
