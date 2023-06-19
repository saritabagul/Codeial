const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
        const post = await Post.findById(req.body.post);
        if(post){
            try{
                let comment = await Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id,                
                });

                // console.log(comment);
                post.comments.push(comment);
                post.save();

                if (req.xhr){
                    // Similar for comments to fetch the user's id!
                 
                    comment = await comment.populate('user', 'name'); 
                 
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }
    

                req.flash('success', 'Comment published!');
                return res.redirect('/');
            }catch(err){
                if(err){
                    req.flash('error',err);
                    //console.log("Error to create a comment",err);
                }
            }
        }
       
    }catch(err){
        // console.log("error in creating a comment");
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async function(req,res){
    try{
        const comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            // comment.remove();
            comment.deleteOne({comment:req.params.id});

            const post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            
             // send the comment id which was deleted back to the views
             if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post comment deleted"
                });
            }

            req.flash('success', "Comment deleted!");
            return res.redirect('back');
        
        }else{
            req.flash('error', err);
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
        //console.log('Record not found to delete',err);
    }
}