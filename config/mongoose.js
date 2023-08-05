const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const uri = "mongodb+srv://auth:db@cluster0.h2bxhg0.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in Connecting to Database"));

db.once('open',()=>{
    console.log("Successfully Connected to Database");
});

module.exports = db;