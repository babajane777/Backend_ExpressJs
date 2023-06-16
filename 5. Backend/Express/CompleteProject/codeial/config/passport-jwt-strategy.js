const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

// it decode the token in the header of the jwt token by using secret key below
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

// used in post.js of v1 to delete a post
// in users_api.js the token is created
passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {

    User.findById(jwtPayLoad._id, function (err, user) {
        if (err) { console.log('Error in finding user from JWT'); return; }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })

}));

module.exports = passport;

// step1 : install passportJWT strategy
// step 2: install jsonwebtoken