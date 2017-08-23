var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');
  methodOverride = require("method-override");
  expressSanitizer = require("express-sanitizer"); //for user input
//App config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(methodOverride("_method")); //to fix form UPDATE/DELETE add action ?_method=PUT or ?_method=DELETE
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer()); //MUST come after body parser
//Mongoose/Model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//Restful Routes
// Blog.create({
//   title: "Test Blog",
//   image: "https://i.pinimg.com/236x/45/ed/cc/45edccf87f211186b55e7db9b8ecba67--hot-dogs-random-pictures.jpg",
//   body: "This is a blog post"
// });
//INDEX route
app.get("/", function(req, res){
  res.redirect("/blogs");
});
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err)
      console.log(err);
    else {
      res.render("index", {blogs: blogs});
    }
  });
});
//NEW Route
app.get("/blogs/new", function(req, res){
  res.render("new");
});
//CREATE route
app.post("/blogs", function(req, res){
  //we use blog.body because that's where the textarea is.
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog){
    if (err) {
      res.render("new");
    }
    else{
      res.redirect("/blogs");
    }
  });
  //redirect to index
});
//SHOW route
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    }
    else {
      res.render("show", {blog: foundBlog});
    }
  });
});
//EDIT route
app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err)
      res.redirect("/blogs");
    else {
      res.render("edit", {blog: foundBlog});
    }
  });
  // res.render("edit");
});
//UPDATE Route
app.put("/blogs/:id", function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect("/blogs");
    }
    else {
      res.redirect("/blogs/"+req.params.id); //redirect to showpage for blog post
    }
  });
});
//DESTROY route
app.delete("/blogs/:id", function(req, res){
  //res.send("destroy this route");
  Blog.findByIdAndRemove(req.params.id, function(err){
    if (err){
      res.redirect("/blogs");
    }
    else {
      res.redirect("/blogs");
    }
  });

});
app.listen(3000, function(){
  console.log("server is running");
});
