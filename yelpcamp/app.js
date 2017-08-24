var express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  myComment = require('./models/comment'),
  seedDB = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();
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
      res.render("campgrounds/index", {campgrounds:allCampgrounds});
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
app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});
app.post("/campgrounds/:id/comments", function(req, res){
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
  //create new comment
  //comment new comment to campground
  //redirect to show page of current campground
});
app.listen(3000, function(){
  console.log("YelpCamp server started");
});
