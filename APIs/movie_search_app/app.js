var express = require('express');
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("search");
});

app.get("/results", function(req, res){
  var query = req.query.search; //what the user entered in the form on /
  request('http://www.omdbapi.com/?s='+query+'&apikey=thewdb', function(error, response, body){
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      // console.log(results);
      // res.send(results['Search'][0]['Title']);
      res.render("results", {data: data});
    }
    else {
      console.log(error);
    }
  });
});

app.listen(3000, function(){
  console.log("movie app started");
});
