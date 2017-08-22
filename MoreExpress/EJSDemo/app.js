var app = require("express")();

app.get("/", function(req, res){
  res.render("home.ejs");
  // res.send("<h1>Welcome to homepage!</h1>");
});
app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing;
  res.render("love.ejs", {thingVar: thing});
});

app.listen(3000, function(){
  console.log("Server started");
});
