var express               = require('express'),
  mongoose                = require('mongoose'),
  passport                = require('passport'),
  bodyParser              = require('body-parser'),
  User                    = require('./models/user'),
  LocalStrategy           = require('passport-local'),
  passportLocalMongoose   = require('passport-local-mongoose'),
  app                     = express();
mongoose.connect("mongodb://localhost/auth_demo_app");
app.use(bodyParser.urlencoded({extended: true})); //using form and posting request
app.set("view engine", "ejs");
app.use(require("express-session")({
  secret: "secret words go here", //used to encode/decode data
  resave: false,
  saveUninitialized: false
}));

//to use passport we need these lines
app.use(passport.initialize());
app.use(passport.session());
//decodes/encodes the user sessions comes with passport-local-mongoose.
passport.use(new LocalStrategy(User.authenticate())); //so we avoid writing authenticate method
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========================
//ROUTES
//========================

app.get("/", function(req, res){
  res.render("home");
});
//signup form
app.get("/register", function(req, res){
  res.render("register");
});
//handle the user signup
app.post("/register", function(req, res){
  //parse data
  //DO NOT save user password plaintext to the database.
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if (err){
      console.log(err);
      return res.render('register');
    }
    //starts the session. In the future, you can change 'local' to twitter, facebook, etc.
    passport.authenticate("local")(req, res, function(){
      res.redirect("/secret");
    });
  });
});
app.get("/secret", isLoggedIn, function(req, res){
  res.render("secret");
});
//LOGIN routes
app.get("/login", function(req, res){
  res.render("login");
});
//passport authenticate as middleware - code that runs before callback.
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req, res){

});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});
//standard for middleware where next is the next thing to call
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function(){
  console.log("Server has started.");
});
