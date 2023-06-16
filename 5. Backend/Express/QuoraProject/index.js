const express = require('express');
const app = express();
const passport = require('passport')
const cookieParser = require('cookie-parser');
const path = require('path');
const port = 8000;
const session = require('express-session');
const passportgoogle = require('./config/passportgoogleAuth');
const db = require('./config/mongoose');
app.use(express.urlencoded());

const expressLayouts = require('express-ejs-layouts');
// used for layouts 
//imp_note:expresslayouts should be used before routes
// app.use(cookieParser);

// make the upload available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(expressLayouts);
app.set('layout extractStyles' , true);
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname,"views"));


app.use(session({
    name:'codial',
    secret:'blahblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 80 * 100)
    },
    // store:  MongoStore.create(
    //     {
    //         mongoUrl:'mongodb://localhost/codeial_development',
    //         autoRemove: 'disabled'
    //     },
    //     function(err){
    //         console.log(err|| 'connect-mongodb setup ok');
    //     }
    // )

}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./Routes'));

app.listen(port , function(err){
    
    if(err){
        console.log(err)
    }

    console.log("your server is running at port 8000");

})








