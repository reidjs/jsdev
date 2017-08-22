var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var friends = ['joey', 'chandler', 'phoebe'];

app.get('/', function(req, res){
  res.render('home');
});
//post method does not work!
app.post("/addfriend", function(req, res){
  console.log(req.body.newfriend);
  var newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect('/friends');
});
app.get('/friends', function(req, res){
  res.render('friends', {friends: friends});
});
app.listen(3000, function(){
  console.log("server starting");
});
