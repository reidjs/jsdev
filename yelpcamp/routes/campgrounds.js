var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
//Index Route
router.get("/", function(req, res){
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
//CREATE Route 
//To make routes RESTful, we use identical URLs for GET and POST
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
  res.render('campgrounds/new');
});
//SHOW (more information about ONE campground)
router.get("/:id", function(req, res){
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

module.exports = router;
