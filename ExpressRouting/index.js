var express = require('express');
var index = express();

index.get("/", function(req, res){
  res.send("Hi there, welcome to my assignment!");
});
//if I were to refactor this, i would do an animal/sound dictionary. 
index.get("/speak/:animal", function(req, res){
  var animal = req.params.animal;
  if (animal === "pig")
    res.send(`the ${animal} says oink`);
  else if (animal === "cow")
    res.send(`the ${animal} says moo`);
  else if (animal === "dog")
    res.send(`the ${animal} says woof woof`);
  else
    res.send(`I don't know about ${animal}`);
});

index.get("/repeat/:word/:num", function(req, res){
  var n = req.params.num;
  var word = req.params.word
  str = ""
  for(var i = 0; i < n; i++){
    str += word +" "
  }
  res.send(str)
});
index.get("*", function(req, res){
  res.send("Sorry page not found");
});

index.listen(3000, function(){
  console.log("server started")
})
