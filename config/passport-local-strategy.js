const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email'
},

async function(email,password,done){
    //find a user and establish the identity
    try{
        const user = await User.findOne({email:email});
        if(!user || user.password != password){
            console.log('Invalid username/password ');
            return done(null,false);  
        }

        return done(null,user);
    }catch(err){
        console.log('error in finding user -->Passport');
        return done(err);
    }
}));

//serialize the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//Deserialize the user from the key in the cookie
passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log('error in finding user -->Passport');
        return done(err);
    }
});

module.exports = passport;

