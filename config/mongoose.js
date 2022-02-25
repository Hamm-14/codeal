const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',function(err){
    if(err){
        console.error.bind("Error in connecting to database");
    }
});

db.once('open',function(){
    console.log("Successfully connected to database");
});

module.exports = db;