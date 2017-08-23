var express = require('express');
var bodyParser = require('body-parser');
app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var campgrounds = [
  {name: "Salmon Creek", image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
  {name: "Mountain Goat Hill", image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg"},
  {name: "Mountain Valley", image: "http://camprrm.com/wp-content/uploads/2011/06/whiteface1.jpg"}
];
app.get("/", function(req, res){
  res.render("landing");
});
app.get("/campgrounds", function(req, res){

  res.render("campgrounds", {campgrounds: campgrounds});
});
//To make routes RESTful, we use identical URLs for GET and POST
app.post("/campgrounds", function(req, res){
  //get form data and add to campgrounds array
  //redirect back to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds"); //automatically redirects as GET
});
app.get("/campgrounds/new", function(req, res){
  res.render('new.ejs');

});
app.listen(3000, function(){
  console.log("YelpCamp server started");
});
