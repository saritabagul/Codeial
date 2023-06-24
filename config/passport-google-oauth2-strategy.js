const passport = require('passport');
const crypto = require('crypto');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"939536668093-gbs1c0hc5ip5vm7m66t4nvgttrj45jgp.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},
async function(accessToken,refreshToken,profile,done){
    try{
        let user = await User.findOne({email:profile.emails[0].value});
        if(user){
            //if found, ser this user as req.user
            return done(null,user);
        }else{
            //if not found, create the user and set it as req.user
          user = await User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            });

            return done(null,user);
        }
    }catch(err){
        console.log('Error in creating user google strategy-passport',err);
        return;
    }
  
                     
}
));

module.exports = passport;