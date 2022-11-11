var express = require('express');
const { response } = require('../app');

var router = express.Router();
var usercollection=require('../connection/user_collection');
const products = require('../products/products');
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
    if(response){
///console.log(response.user,"userNameeeeee")
req.session.LoggedIn=true
      req.session.user=response.user
     res.redirect('/')}
  })
}))
router.get('/logout',((req,res)=>{
  
  req.session.destroy()
  res.redirect('/')
}))
router.post('/log',((req,res)=>{
console.log(req.body,"logIn")
  usercollection.log(req.body).then((respons)=>{
    if(respons.status){ console.log("index log response")
   req.session.LoggedIn= true
    req.session.user=respons.user
   /// if (response.status){
     // req.session.LoggedIn=true
      ////req.session.user=response.usercollection
    res.redirect('/')}
    else {
      res.send("incorrect Password")
    }
   



    
  })
}))
function cat(){
var products=[
  {
   image:"images/medicin/drug2.jpg",
   id:"1",
   discription:"50mg ",
   price:130
   
   
   },
   {
    image:"images/medicin/drug3.jpg",
    id:"2"
    ,
   discription:"50mg ",
   price:250

    },
    {
      image:"images/medicin/drug4.jpg",
      id:3
      ,
   discription:"50mg ",
   price:108
      },
      {
        image:"images/medicin/drug.jpg",
        id:"4"
        ,
   discription:"50mg ",
   price:"150"
        },
        {
          image:"images/medicin/drug2.jpg",
          id:"5",
          
   discription:"50mg ",
   price:100
          },
          {
            image:"images/medicin/drug2.jpg"
            ,
          id:"6",
          
   discription:"50mg ",
   price:122
            }
            
  
  ]
return products;
}
  
router.get('/buy',((req,res,)=>{
 
const prod=cat();
console.log(prod)

  res.render('buy',{prod})
}))



router.get('/cart/:id',((req,res)=>{
  
  
  console.log(req.params)
  var uniq=req.params


  
  usercollection.addCart(uniq).then((response)=>{
    console.log(response)
  
  })
 res.send('cart added')
}))
 

  router.get('/order',(req,res)=>{
  usercollection.cartOrder().then((resp)=>(
    console.log(resp[0].id,"resolve value")
   
   
  ))
if (resp[0].id==products.id){

}
    res.render("cart")
  })

module.exports = router;
