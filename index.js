const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');

//setup the router
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');

//require passport and localStrategy that I hav set in
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

//for storing the session cookie permanently in db even after server restarts
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const customMware = require('./config/middleware');


//setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);

chatServer.listen(5000, () => {
    console.log('chat server is listening on port 5000');
});

//getting data from post request
app.use(express.urlencoded({extended: true}));

//making our app to use cookieParser
app.use(cookieParser());

//setting up the path for static files
app.use(express.static(env.asset_path));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

//making my app to use the layout during rendering the file
app.use(expressLayouts);

//extract styles and scripts from subpages and put it into the head(style) and at the last inside the body tag(scripts)
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up ejs
app.set('view engine','ejs');
app.set('views','./views');

//adding middleware which takes-in session cookie and encrypt it
//MongoStore is used to store the session cookie in db
app.use(session({
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
    })
}));

//initilizing passport for authentication
app.use(passport.initialize());

//using passport for maintaining sessions
app.use(passport.session());

//setup current user usage
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//routing to the routes folder for home('/') request
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        // console.log("Error in running the server",err);
        console.log(`Error in running the server: ${port}`);
        return;
    }
    // console.log("Yup! Express is up and running on port: ",port);
    console.log(`Yup! Express server is up and running on port: ${port}`);
});