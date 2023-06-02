const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8001;
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));
//use express router

app.use('/',require('./routes')); 
// or app.use('/',require('./routes/index')); 

// setup view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }

    console.log(`server is running on port : ${port}`);
});