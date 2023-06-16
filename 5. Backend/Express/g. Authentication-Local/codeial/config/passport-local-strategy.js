const { serializeUser } = require('passport');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }


));

// after authentication the user is passed to the serializeUser

// In the local strategy of Passport, serialization and deserialization functions are used to store and retrieve user information between HTTP requests.
// During the authentication process once the user's credentials are validated, Passport calls the serializeUser function to serialize the user information into a form that can be stored in a session or a cookie. The serializeUser function is responsible for selecting the relevant information to store in the session, usually the user's ID. This serialized data is then sent to the client as a cookie or stored in a session.
// On subsequent requests, when the user is considered authenticated, Passport uses the deserializeUser function to retrieve the user data from the session or cookie. The deserializeUser function is responsible for taking the serialized user data and retrieving the full user object from a database or other data source. Once the full user object is retrieved, it is added to the req object so that it can be used in the application's route handlers.
// So, to summarize, in the local strategy of Passport, both serialization and deserialization occur after the user is authenticated. The serializeUser function is called to store the user data, and the deserializeUser function is called to retrieve the user data on subsequent requests.


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is sign-in then pass the function to the next function
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        
        // req.user contains the current user signed in from cookies nad we are sending this user into the locals for the views
        res.locals.user = req.user

    }

    next();

}




module.exports = passport;