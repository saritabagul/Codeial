const express = require('express');
const app = express();
const port = 8000;

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