var mongoose = require('mongoose');
var Campground = require('./models/campground');
var myComment = require('./models/comment');
var data = [
  {
    name: "Campground Name",
    image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Rolling Rock",
    image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Seirra Nevada",
    image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];
function seedDB(){
  //remove all campgrounds
  Campground.remove({}, function(err){
    if(err)
      console.log(err);
    else {
    console.log("removed all campgrounds");
    //add campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if (err)
          console.log(err);
        else {
          console.log("campground added");
          //create comment
          myComment.create({
            text: "This place is great but there's no water",
            author: "Bob"
          }, function(err, comment){
            if (err)
              console.log(err);
            else {
              console.log("created new comment ");
              campground.comments.push(comment);
              campground.save();
            }
          });
        }
      });
    });
    }
  });
  //add comments
}
module.exports = seedDB;
