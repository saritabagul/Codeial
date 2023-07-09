const express = require('express');
const logger = require('morgan');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');

//flash messages
const flash = require('connect-flash');

const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(logger(env.morgan.mode,env.morgan.options));
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// app.use(express.static('./assets')); 
app.use(express.static(env.asset_path));
//use express router

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));



// setup view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'codeail',
    // TODO change the secret before deployment in production mode
    secret:env.session_cookie_key,
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

app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes')); 
// or app.use('/',require('./routes/index')); 



app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }

    console.log(`server is running on port : ${port}`);
});