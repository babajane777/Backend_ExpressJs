const express = require('express');
const path = require('path');
const port = 8000;
const app = express();
app.use(express.urlencoded());

const expressLayouts = require('express-ejs-layouts');
// used for layouts 
//imp_note:expresslayouts should be used before routes
app.use(expressLayouts);
app.set('layout extractStyles' , true);


app.set("view engine" , "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static("Assets"));

const db = require('./config/mongoose');
const TodoList = require('./model/todolist');

// app.use(require('trim-request-body')());



app.get("/", function(req,res){
    return res.render("todo")
})

app.post("/createTodo" , function(req,res){
    TodoList.create({
        discription: req.body.discription,
        date: req.body.dueDate,
        category: req.body.category
    },function(err,newtodo){
        if(err){
            console.log(err)
        }
        // console.log(newtodo)

    })

app.get("/list", function(req,res){
    
    TodoList.find({},function(err, list){
        // console.log(list);
        if(err){
            console.log("err")
            return;
        }

        return res.render("list",{
            title:"list",
            todoList:list  
        })
    })
     
})



app.get("/deleteTodo" , function(req,res){
    let id = req.query.id;
    TodoList.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error while deleting")
        }

        res.redirect("back")
    })
    
})
    
   
    
})

app.listen(port,function(err){
    if(err){
        console.log(err)
    }

    console.log("server is running on port"  + " " + port)
 
})