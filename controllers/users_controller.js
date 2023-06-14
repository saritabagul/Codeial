const User = require('../models/user'); // importing users schema


module.exports.profile = async function (req, res) {
    //    return res.end('<h1>Users Profile</h1>');

     try{
        const user = await User.findById(req.params.id);
        return res.render('profile', {
            title: "Users Profile",
            profile_user:user
        });
     }catch(err){

     }   
   
}

//render the sign up page
// module.exports.signUp = function (req, res) {
//     return res.render('users_sign_up', {
//         title: "Codeial | Sign Up"
//     })
// }

module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_in', {
        title: "Codeial | Sign In"
    })
}


//get the sign up data
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const createUser = User.create(req.body);
            try {
                return res.redirect('/users/sign-in');
            } catch (err) {
                console.log('Error in creating user in signing up', err);
                return;
            }

        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in finding user in signing up', err);
        return;
    }

}



// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

//destroy the session on signout
module.exports.destroySession = function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
    res.redirect('/');
    });
     
        
    // req.logout();
    // return redirect('/');
}


//Update user profile
module.exports.update = async function(req,res){
    if(req.user.id = req.params.id){
        try{
            const user = await User.findByIdAndUpdate(req.params.id,req.body);
            return res.redirect('back');
        }catch(err){
            console.log('Error to update the record ',err);
            return res.redirect('back');
        }

    }else{
        return res.status(401).send('Unauthorized');
    }
}