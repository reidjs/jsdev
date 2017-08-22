var express = require("express");
var app = express();
//serve the contents of our public directory! (linking)
app.use(express.static("public"));
//now we don't have to add .ejs to end of each view
app.set("view engine", "ejs");
app.get("/", function(req, res){
  res.render("home");
  // res.send("<h1>Welcome to homepage!</h1>");
});
app.get("/posts", function(req, res){
  var posts = [
    {title: "post 1", author: "joe"},
    {title: "hello there", author: "susan"},
    {title: "and another post", author: "asdf"}
  ];
  res.render("posts", {posts: posts});
});
app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing;
  res.render("love", {thingVar: thing});
});

app.listen(3000, function(){
  console.log("Server started");
});
