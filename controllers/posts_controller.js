const Posts = require('../models/post');
const Comments = require('../models/comments');

module.exports.posts = function(req,res){
    res.send('<h1> Posts controller loading</h1>');
}

// module.exports.create = async function(req,res){
//     try{
//         const post = await Posts.create({
//             content:req.body.content,
//             user:req.user._id,
//         });

//         if(req.xhr){
//             res.status(200).json({
//                 data:{
//                     post:post
//                 },
//                 message:"Post Created!"

//             });

//         }

//         req.flash('success','Post published!');
//         return res.redirect('back');
//     }catch(err){
//         req.flash('error',err);
//         return res.redirect('back');
//         // console.log("error in creating a post");return;
//     }
 
// }

module.exports.create = async function(req, res){
    try{
        let post = await Posts.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if (req.xhr){
             // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it! (To display the user's name with the post added dynamically)
            try{
                post = await post.populate('user', 'name');
            }catch(err){
                console.log(err);
            }    
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
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

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted!"
                });
            }

            req.flash('success','Post and associated comments deleted successfully!');
            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
        // console.log('Record not found',err);
    }
}