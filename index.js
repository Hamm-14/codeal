const express = require('express');
const port = 8000;

//setup the router
const app = express();
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');

//setting up the path for static files
app.use(express.static('./assets'));

//making my app to use the layout during rendering the file
app.use(expressLayouts);

//extract styles and scripts from subpages and put it into the head(style) and at the last inside the body tag(scripts)
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//routing to the routes folder for home('/') request
app.use('/',require('./routes/index'));

//setting up ejs
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        // console.log("Error in running the server",err);
        console.log(`Error in running the server: ${port}`);
        return;
    }
    // console.log("Yup! Express is up and running on port: ",port);
    console.log(`Yup! Express server is up and running on port: ${port}`);
});