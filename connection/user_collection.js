var db=require('../config/connection')
var objectId=require('mongodb').ObjectId
const bcrypt = require('bcrypt');                    
const { response } = require('../app');
const { use } = require('../routes');


module.exports={
    register:(userDta)=>{
       // console.log(userDta,"DBuserdta")
        let loginstatus=false
        let response={}
        
        return new Promise(async(resolve,reject)=>{
             let pwd =userDta.password.toString();
            userDta.password=await bcrypt.hash(pwd,10)
            db.get().collection('pass').insertOne(userDta).then((response)=>{
          ///  console.log(response)
            response.status=true
            response.user=userDta.name
//            console.log(response.user,"db respon.user")
                resolve(response)
                
                
                
            })
        })
    },
    log:(password)=>{
       console.log(password.password,"passww")
        return new Promise(async(resolve, reject) => {
            let loginstatus=false
            let response={}
            let user=await db.get().collection('pass').findOne({email:password.email})
            console.log(user,"DB user")
            
      if (user){
        
        bcrypt.compare (password.password .toString(),user.password).then((status)=>{
            console.log(status,"DBstatus")
if (status){
    console.log("sucess")
    response.status=true;
    response.user=user;
    resolve(response)
    console.log(response,"DB RESOLVED RESPONSE")
}else{
    console.log("failed")
    
    resolve({status:false})
}
        })
      }else{
        console.log("user not found")
        resolve({status:false})
      }
        })
    }

}