var db=require('../config/connection')
module.exports={

addproducts:(proid,price)=>{
    console.log(proid,"prod id database")
return new Promise((resolve, reject) => {
    db.get().collection('products').insertOne(proid).then((data)=>{
        console.log(data)
        resolve(proid)
    })
})


}



}