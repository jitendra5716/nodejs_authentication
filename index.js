//important imports

require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//set to index
app.set('view engine','ejs');
app.set('views','./views');


app.use(expressLayout);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(session({
    name:'codeial',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({mongoUrl:'mongodb+srv://auth:db@cluster0.h2bxhg0.mongodb.net/?retryWrites=true&w=majority'})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(customMware.setFlash);

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index.js'));


//listener


app.listen(PORT,(err)=>{
    if(err){
        console.log("Error in starting the server");
        return;
    }
    console.log(`Express Server is running on port ${PORT}`);
})