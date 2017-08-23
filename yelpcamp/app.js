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
  image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Mountain Goat Hill",
//   image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg"
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
app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if (err)
      console.log(err);
    else {
      res.render("campgrounds", {campgrounds:allCampgrounds});
    }
  });
  //res.render("campgrounds", {campgrounds: campgrounds});
});
//To make routes RESTful, we use identical URLs for GET and POST
app.post("/campgrounds", function(req, res){
  //get form data and add to campgrounds array
  //redirect back to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
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
app.get("/campgrounds/new", function(req, res){
  res.render('new.ejs');

});
app.listen(3000, function(){
  console.log("YelpCamp server started");
});
