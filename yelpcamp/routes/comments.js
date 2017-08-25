var express = require('express');
var router = express.Router({mergeParams: true}); //mergeParams ensures that comment accesses the ID
var Campground = require('../models/campground');
var myComment = require('../models/comment');
//Comments New
router.get("/new", isLoggedIn, function(req, res){
  console.log(req.params.id);
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});
//Comments Create
router.post("/", isLoggedIn, function(req, res){
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
//Middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
