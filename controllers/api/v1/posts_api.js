const Post = require('../../../models/post');
const Comments = require('../../../models/comments');

module.exports.index = async function(req,res){
     const posts = await Post.find({})
         .sort('-createdAt')
         .populate('user')
         .populate({
            path: 'comments',
            populate: {
               path: 'user'
            },
            options: { sort: { createdAt: -1 }} // sort the comments
         })

    return res.status(200).json({
        message:"List of posts",
        posts:posts
    });
}

module.exports.destroy = async function(req,res){
    try{
        const post = await Post.findById(req.params.id);
       
            // post.remove();
            post.deleteOne({post:req.params.id});
            await Comments.deleteMany({post:req.params.id});

                   
            return res.status(200).json({
                message:"Post and associated comments deleted successfully!"
           })
       
    }catch(err){
        console.log(err);
       return res.status(500).json({
            message:"Internal server error"
       })
       
    }
}