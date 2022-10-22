const{User}=require("../models")
exports.getusers=(req,res)=>{
    User.findAll().then((u)=>{
        res.send(u)
    }).catch((e)=>{
        res.status(500).send("something went wrong")
    })
}