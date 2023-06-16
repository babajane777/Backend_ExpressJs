const express = require('express');
const port = 8000;
const path = require('path');
const app = express();

const contactList = [
    {Myname:"sireesha",MobileNo:"78277723647"},
    {Myname:"Mehera",MobileNo:"5605038597"}]

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());

app.get('/',function(req,res){
    res.render('home',{
        title:"home-page",
        contactlist:contactList
    });
});


app.post('/contacts',function(req,res){
    // console.log(req.body)
    contactList.push({
        Myname:req.body.name,
        MobileNo:req.body.phone
    })
    return res.redirect('/')

})

app.listen(port,function(err){
    if(err){
        console.log('error in starting server');
    }
  console.log('your server is running at port 8000');
})