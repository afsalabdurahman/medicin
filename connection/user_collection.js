
var db=require('../config/connection')
var bcrypt=require('bcrypt')
const { response } = require('../app')
var objectId=require('mongodb').ObjectId


module.exports={
register:(userDatas)=>{
    console.log(userDatas,"userdata")
    return new Promise((resolve,reject)=>{
        const saltRounds = 10;
        const myPlaintextPassword = userDatas.password
        const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
        console.log(hash)
    userDatas.password=hash
        db.get().collection('finalPlus').insertOne(userDatas).then((data)=>{
            resolve(data)
            console.log(data)
            console.log(data.password)
            console.log(userDatas.password)
            console.log("hello")
            
            
        })
    })
},
log:(userData)=>{
    console.log(userData)
    
    console.log(userData.email)
    return new Promise(async(resolve,reject)=>{
let status=false
let respons={}
let user=await db.get().collection('finalPlus').findOne({email:userData.email})
console.log("user")
console.log(user)

if(user){

    var val = bcrypt.compareSync(userData.password, user.password);
        console.log(val)
        if (val) {
            respons.status=true
            respons.user=user
            resolve(respons)
        }
        else console.log("incorrect password")
        resolve({status:false})
       
        
}
     else{
          console.log("user not found")
          
          resolve({status:false})
          }
      })
},

addCart:((proid)=>{
    console.log(proid,"bdscsssss")
    return new Promise((resolve, reject) => {
        db.get().collection('Cart').insertOne(proid).then((data)=>{
            resolve(data)
        })
    })

}),
cartOrder:(()=>{
    return new Promise(async(resolve, reject) => {
        let proid= await db.get().collection('Cart').find({}).toArray();  
        
       if(proid){
       
         let count1= await db.get().collection('Cart').find({"id" : "1"}).count();
          
          var arry={"id":proid,"count":count1}
        resolve(proid)

        }
        })
})

}


    