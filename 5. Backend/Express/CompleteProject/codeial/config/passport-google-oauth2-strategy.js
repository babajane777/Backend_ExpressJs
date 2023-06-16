const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// console.developers.google.com
// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '49667396728-c9fkoorlaov7p49co99c3h17dsujrfr4.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;


// note: The passport.initialize() middleware is responsible for setting up Passport.js 
// and preparing it to authenticate requests. The passport.session() middleware is responsible for 
// deserializing the user object from the session data and attaching it to the req.user object, 
// so that it can be accessed by subsequent middleware and route handlers.