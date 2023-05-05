require('dotenv').config()
const express=require('express');
const session = require('express-session');
const passport=require("passport");
const app=express();
require("./passport-setup");
app.set("view engine", "ejs");

app.use(session({ secret: process.env.SESSION_SECRET })); // session secret
app.use(passport.initialize());
app.use(passport.session());

const port=5000

app.get("/",(req,res)=>{
    res.render("pages/index");
})

app.get('/success',(req,res)=>{
    res.render("pages/profile",{name:req.user.displayName,email:req.user.emails[0].value,pic:req.user.photos[0].value});
})

app.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));


app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
});


app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})

