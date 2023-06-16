const express = require('express');
const path = require('path');
const port = 8001;
const db = require('./config/mongoose');
const Contact  = require('./models/contact');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('Assets'));
app.use(express.static('html'))

var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res){
    // res.send(<h1>hello</h1>)
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', function(req, res){

    Contact.find({},function(err,contacts){
        // var document = contacts;
        // console.log(document);
        if(err){
            console.log("error while findng ")
            return;
        }
        
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        })
                   
    })
    // return res.render('home',{
    //     title: "Contact List",
    //     contact_list: contactList
    // });
})

app.post('/create-contact', function(req, res){
    
    // contactList.push(req.body);
    // return res.redirect('/');
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newcontact){
        if(err){
            console.log("error occured while creating contact")
        }

        console.log("new contact created:", newcontact)
    })

});


app.get('/delete-contact', function(req, res){
    console.log(req.query);
    let id = req.query.id;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone)

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1)

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error while deleting ")
        }

        res.redirect("back")
    })   
});

app.get("/test", function(req,res){

    res.sendFile(path.join(__dirname, "Assets/html" ,"test.html"))
})



app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})



