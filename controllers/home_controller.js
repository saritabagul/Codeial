const Post = require('../models/post');

// module.exports.actionName = function(req, res){}

/* previous code
module.exports.home = function(req, res){
   // return res.end('<h1>Express is up for Codeial!</h1>')
      // console.log(req.cookies);  // requesting cookier from browser
      // res.cookie('new_user',20); // sending  cookier to browser
   return res.render('home',{
        title:"Home",
   });
}
*/

module.exports.home = async function(req,res){
   /* here we get only user._id we need to diplay author name also..so need to take whole user object
   try{
      const posts = await Post.find({});
      return res.render('home',{
         title:"Codeial | Home",
         posts:posts
      });
   }catch(err){
      console.log('Error to find the posts',err);
   }
   */

   try{
      const posts = await Post.find({}).populate('user').exec();
      return res.render('home',{
         title:"Codeial | Home",
         posts:posts
      });
   }catch(err){
      console.log('Error to find the posts',err);
   }
}

