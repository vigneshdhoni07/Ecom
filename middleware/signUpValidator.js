const {User,ROLES}=require("../models");


const checkUserandEmail=(req,res,next)=>{
    const{username,email}=req.body
    if(!username || !email)
    {
        res.status(400).send("username or email not passed")
        return;
    }
    const checkusername=User.findOne({
        where:{
            username:username
        }
    })
    const checkemail=User.findOne({
        where:{
            email:email
        }
    })
    Promise.all([checkusername,checkemail]).then((userdetails)=>{
        if(userdetails[0]||userdetails[1]){
            res.status(400).send("username or email already exist")
            return
        }
        next()
    }).catch((e)=>{
        res.status(500).send("something went wrong")
    })
}
const checkrolesexist=(req,res,next)=>{
    const {roles}=req.body
    if(roles)
    {
        for(let i=0;i<roles.length;i++){
            if(!ROLES.includes(roles[i])){
                res.status(400).send(`user role ${roles[i]} doesn't exist`)
                return
            }
        }

    }next()
    
}
module.exports={
    checkUserandEmail:checkUserandEmail,
    checkrolesexist:checkrolesexist
}