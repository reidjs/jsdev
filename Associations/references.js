//Referencing data instead of embedding it into the object
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");



//
// //POST - title, content
// var postSchema = new mongoose.Schema({
//   title: String,
//   content: String
// });
// var Post = mongoose.model("Post", postSchema);

//USER - email, name
var Post = require("./models/post");
var User = require("./models/user");
// var userSchema = new mongoose.Schema({
//   email: String,
//   name: String,
//   posts: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Post"
//     }
//   ] //embedded data
// });
// var User = mongoose.model("User", userSchema);
//find user and all posts by user
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//   if (err){
//     console.log(err);
//   }
//   else {
//     console.log(user);
//   }
// });


Post.create({
  title: "How to cook food PT 4",
  content: "lorem ipsdfsdfdsfsdfdsfsdfdsfdsfsum"
}, function(err, post){
  User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
    if (err){
      console.log(err);
    }
    else {
      foundUser.posts.push(post);
      foundUser.save(function(err, data){
        if (err){
          console.log(err);
        }
        else {
          console.log(data);
        }
      });
    }
  });
  console.log(post);
});
// User.create({
//   email: "bob@gmail.com",
//   name: "bob"
// });
// var newUser = new User({
//   email: "hermione@gmail.com",
//   name: "hermione granger"
// });
// newUser.posts.push({
//   title: "how to do potions",
//   content: "step 1 do x step 2 do y"
// });
// newUser.save(function(err, user){
//   if (err){
//     console.log(err);
//   }
//   else {
//     console.log(user);
//   }
// });
// var newPost = new Post({
//   title: "Bullshit kicking field goals",
//   content: "For real"
// });
// newPost.save(function(err, post){
//   if (err){
//     console.log(err);
//   }
//   else {
//     console.log(post);
//   }
// });
// User.findOne({name: "hermione granger"}, function(err, user){
//   if (err){
//     console.log(err);
//   }
//   else {
//     user.posts.push({
//       title: "top 10 things i do",
//       content: "blah blah blah"
//     });
//     user.save(function(err, user){
//       if (err){
//         console.log(err);
//       }
//       else {
//         console.log(user);
//       }
//     });
//   }
// });
