module.exports.home = function(req, res){
   // return res.end('<h1>Express is up for Codeial!</h1>')
      // console.log(req.cookies);  // requesting cookier from browser
      // res.cookie('new_user',20); // sending  cookier to browser
   return res.render('home',{
        title:"Home",
   });
}

// module.exports.actionName = function(req, res){}