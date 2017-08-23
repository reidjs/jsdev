var express = require('express');
var app = express();

//ROUTES: request and response for each route.
app.get("/", function(req, res){
  res.send("Hello!");
});

app.get("/bye", function(req, res){
  res.send("Goodbye!");
});
app.get("/dog", function(req, res){
  console.log("made a request to /dog");
  res.send("Meow!");
});
//route parameters to define a pattern within a route. 
app.get("/r/:subredditName", function(req, res){
  var subreddit = req.params.subredditName;
  res.send("Welcome to the " + subreddit + " subreddit!");
});
//Warning: order matters with routes. If this is first, it will override the others.
app.get("*", function(req, res){
  res.send("Splat operator triggered");
});

//on cloud 9 we would use (process.env.PORT, process.env.IP) params
app.listen(3000, function(){
  console.log("Server has started.");
});
