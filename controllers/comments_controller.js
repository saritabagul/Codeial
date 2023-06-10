const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
        const post = await Post.findById(req.body.post);
        if(post){
            try{
                const comment = await Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id,                
                });

                // console.log(comment);
                post.comments.push(comment);
                post.save();
                
                return res.redirect('/');
            }catch(err){
                if(err){console.log("Error to create a comment",err);}
            }
        }
       
    }catch(err){
        console.log("error in creating a comment");return;
    }
}