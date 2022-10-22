var express = require('express');
const { response } = require('../app');

var router = express.Router();
var usercollection=require('../connection/user_collection');
const { route } = require('./users');
/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.LoggedIn=true
  var user=req.session.user
  if (req.session.user){
   
  res.render('index',{user})}
  else{
    res.render('index')
  }
  });
router.get('/log',((req,res)=>{
res.render('userpage/loging.hbs')
}));
router.get('/register',((req,res)=>{
  res.render('userpage/register.hbs')
  }));
  // router.post('/register',((req,res)=>{
  //   console.log(req.body)
  //   console.log(req.ip)

  
  //   console.log("wlcome page dis[play")
  //   user_collection.Register(req.body).then((response)=>{
  //     res.redirect('/')
  //   })

    
  //   }))
  
// router.post('/register', function(req, res) {
//   usercollection.register(req.body).then((response)=>{
// if(response.status)
// {    req.session.loggedIn=true;
//     req.session.user=response.user
//     let user= req.session.user
//    console.log(response.user)
//    console.log("respon")
//        res.redirect('/',{user})
//   }
  
//   console.log("working")

// })
router.post('/register',((req,res,next)=>{
  
  usercollection.register(req.body).then((response)=>{
   // console.log(response,"Index response")
    if(response.status)
///console.log(response.user,"userNameeeeee")
req.session.LoggedIn=true
      req.session.user=response.user
     res.redirect('/') 
  })
}))
router.get('/logout',((req,res)=>{
  
  req.session.destroy()
  res.redirect('/')
}))
router.post('/log',((req,res)=>{
console.log(req.body,"logIn")
  usercollection.log(req.body).then((response)=>{
    console.log(response,"index log response")
    if (response.status){
      req.session.LoggedIn=true
      req.session.user=response.usercollection
    res.redirect('/')
    }
  })
}))
module.exports = router;
