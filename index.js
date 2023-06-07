const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8001;
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));
//use express router



// setup view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'codeail',
    // TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    //store cookiein mongo store
    // store:new MongoStore({
    //     mongooseConnection:db,
    //     autoRemove:"disabled"
    // },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development'
      },
    function(err){
        console.log(err || "connect mongodb setup ok");
    }
    
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes')); 
// or app.use('/',require('./routes/index')); 

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }

    console.log(`server is running on port : ${port}`);
});