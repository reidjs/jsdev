var express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  seedDB = require('./seeds');

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//schema for mongoose

app.get("/", function(req, res){
  res.render("landing");
});
//INDEX
app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if (err)
      console.log(err);
    else {
      res.render("index", {campgrounds:allCampgrounds});
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
  res.render('new.ejs');
});
//SHOW (more information about ONE campground)
app.get("/campgrounds/:id", function(req, res){
  //find page with that id, then show it.
  // Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(err);
    }
    else {
      console.log(foundCampground);
      res.render('show', {campground: foundCampground});
    }
  });
});
app.listen(3000, function(){
  console.log("YelpCamp server started");
});
