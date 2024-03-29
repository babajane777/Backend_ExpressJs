const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/TodoList');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// acquiring the connection
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error to connect database'));



// printing mesg if connected
db.once('open',function(){
    console.log('database was connected successfully')
})