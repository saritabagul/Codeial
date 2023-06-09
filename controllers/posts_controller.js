const Posts = require('../models/post');

module.exports.posts = function(req,res){
    res.send('<h1> Posts controller loading</h1>');
}

module.exports.create = async function(req,res){
    try{
        const post = await Posts.create({
            content:req.body.content,
            user:req.user._id,
        });
        return res.redirect('back');
    }catch(err){
        console.log("error in creating a post");return;
    }
     

}