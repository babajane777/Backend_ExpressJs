const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const path =  require('path');

// used for layouts 
// note:expresslayouts should be used before routes
app.use(expressLayouts);
// requests will come here initially and were diverted to  "index.js" of "./routes"  folder.
app.use('/', require('./routes'))

// using express router

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./Assets'));




// used for applying css file in layout for static files
app.set('layout extractStyles' , true);

// used for applying script file in layout for static files
// app.use('layout, extractScripts' , true);



app.listen(port, function(err){

    if(err){

        console.log("error in running the server:" + err)
    }

    console.log("server is running on port:" + port)
})


