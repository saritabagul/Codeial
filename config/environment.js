const development={
    name:'development',
    asset_path:'/assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {     
          user: 'bagulsarita2016',
          pass: 'ujqdlcqrxhpzwrxz'
        }
      },
      google_client_id:"939536668093-gbs1c0hc5ip5vm7m66t4nvgttrj45jgp.apps.googleusercontent.com",
      google_client_secret:"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",
      google_callback_url:"http://localhost:8000/users/auth/google/callback",
      jwt_secret:'codeial'

}

const production ={
    name:'production'
}

module.exports = development;