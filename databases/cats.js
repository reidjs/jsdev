var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);
// //set up a cat object
// var george = new Cat({
//   name: "georgia",
//   age: 13,
//   temperament: "Nice"
// });
// //add to DB
// george.save(function(error, cat){
//   if (error)
//     console.log("something went wrong");
//   else
//     console.log("added to db: "+cat);
// });
//to make a new object AND save it to db
Cat.create({
  name: "Bob",
  age: 15,
  temperament: "Cool"
}, function(err, cat){
  if (err)
    console.log(err);
  else
    console.log(cat);
});

//retrieve all cats from DB (print to console)
Cat.find({}, function(err, cats){
  if (err)
    console.log(err);
  else
    console.log("All the cats: "+ cats);
});
