var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');
app = express();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//schema for mongoose
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Mountain Goat Hill",
//   image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg",
//   description: "A hill covered with mountain goats, what else would it be?"
// }, function(err, campground){
//   if (err)
//     console.log(err);
//   else
//     console.log("NEW CAMPGROUND: ",campground);
// });


// var campgrounds = [
//   {name: "Salmon Creek", image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
//   {name: "Mountain Goat Hill", image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg"},
//   {name: "Salmon Creek", image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
//   {name: "Mountain Goat Hill", image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg"},
//   {name: "Salmon Creek", image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
//   {name: "Mountain Goat Hill", image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg"},
//   {name: "Salmon Creek", image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
//   {name: "Mountain Goat Hill", image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg"},
//   {name: "Salmon Creek", image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
//   {name: "Mountain Goat Hill", image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg"},
//   {name: "Mountain Valley", image: "http://camprrm.com/wp-content/uploads/2011/06/whiteface1.jpg"}
// ];
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
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(err);
    }
    else {
      res.render('show', {campground: foundCampground});
    }
  });


});
app.listen(3000, function(){
  console.log("YelpCamp server started");
});
