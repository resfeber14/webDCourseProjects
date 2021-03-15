require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs'); 
const mongoose = require('mongoose');
//var encrypt = require('mongoose-encryption');
//var md5 = require('md5');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: 'Thisismysecretvro',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
  }))
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex",true);
const userSchema =new mongoose.Schema({
    email:String,
    password:String
});
userSchema.plugin(passportLocalMongoose);
//userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields:["password"]});

const User=new mongoose.model("User",userSchema);
app.get("/", function(req, res){
    res.render("home");
}); 
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/login", function(req, res){
    res.render("login");
});
app.get("/register", function(req, res){
    res.render("register");
})
app.get("/secrets", function(req, res){
    if(req.isAuthenticated()){
        res.render("secrets");
    }
    else{
        res.redirect("/login");
    }
});
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})
app.post("/register", function(req, res){
    /*bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const newUser = new User({
            email:req.body.username,
            password:hash
        });
        newUser.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                res.render("secrets");
            }
        });
    });*/
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            })
        }
    })
});
app.post("/login", function(req, res){
    /*const username=req.body.username;
    const password=req.body.password;
    User.findOne({email: username}, function(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){
                bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
                    // result == true
                    if(result===true){
                        res.render("secrets");
                    }
                });
                    
                
            }
        }
    });*/
    const user=new User({
        username:req.body.username,
        password:req.body.password
    });
    req.login(user, function(err) {
        if (err) { 
            console.log(err);
        }
        else{
            passport.authenticate("local") (req, res,function(){
                res.redirect("/secrets");
            })
        }
        
      });
    
});



app.listen(3000, function() {
    console.log("Server started");
})