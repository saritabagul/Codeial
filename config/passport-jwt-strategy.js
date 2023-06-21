const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
};

passport.use(new JwtStrategy(opts,async function(jwtPayload,done){
    const user = await User.findById(jwtPayload._id);

    if(err){console.log('Error in finding user from jwt'); return;}

    if(user){
        return done(null,user);
    }else{
        return done(null,false);
    }
}));
