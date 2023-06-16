const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: '442610384068-uhi6p1ppdvedd8rlp9088u48uce8mljb.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    callbackURL: "http://localhost:8000/user/auth/google/callback",
},

    async function (accessToken, refreshToken, profile, done) {
        // find a user

        try {
            let user = await User.findOne({ email: profile.emails[0].value })
            // console.log(accessToken, refreshToken);
            // console.log(profile);

            // if (user) {
            //     console.log("hello ")
            //     // if found, set this user as req.user
            //     return done(null, user);
            // } else {
            // if not found, create the user and set it as req.user
            await User.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            })
            return done(null, user);

            // }

        } catch (err) {

            console.log(err);
            return res.redirect('back');

        }
    }

));

// serializeUser determines which data of the user object should be stored in the session

passport.serializeUser(function (user, done) {
    return done(null, user.id);
})

// The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
// serializeUser determines which data of the user object should be stored in the session. 
// The result of the serializeUser method is attached to the session as req.session.passport.user = {}. Here for instance,
//  it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'}
// 



// The fetched object is attached to the request object as req.user
// deserialization  puts the user into the req object 
passport.deserializeUser(async function (id, done) {
    let user = await User.findById(id);
    //flow of the code will be maintain             
    return done(null, user);
})
// /req.user



passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/login');
}

module.exports = passport;