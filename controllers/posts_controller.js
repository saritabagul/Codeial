const Posts = require('../models/post');
const Comments = require('../models/comments');

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

module.exports.destroy = async function(req,res){
    try{
        const post = await Posts.findById(req.params.id);
        //.id means converting the object _id into string
        if(post.user == req.user.id){
            // post.remove();
            post.deleteOne({post:req.params.id});
            await Comments.deleteMany({post:req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Record not found',err);
    }
}