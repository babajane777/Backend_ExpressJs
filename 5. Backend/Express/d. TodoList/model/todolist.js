const mongoose = require('mongoose');
const TodolistSchema = new mongoose.Schema({
    discription:{
        type:String,
        required:true
    },

    date:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    }
})

const Todolist = mongoose.model("Todolist" , TodolistSchema);

module.exports = Todolist;