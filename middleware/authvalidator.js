const { User } = require("../models")
const jwt=require("jsonwebtoken")

const verifytokken=(req,res,next)=>{
    var token=req.headers["x-access-tokken"]
    if(!token)
    {
        res.status(400).send({message:"JWT Missing"})
        return;
    }
    jwt.verify(token,process.env.SECRET_KEY, async function(err,decoded){
        if(err)
        {
            res.status(401).send({message:"unauthorised token"})
        }
        const userid=decoded.id;
        try{
        const user=await User.findByPk(userid);
        const roles=await user.getRoles();
        
        const elegibleroles=[];
        roles.forEach(role => {
            elegibleroles.push(role.name)
            
        });
       
        req.userdetails=user
        req.roles=elegibleroles
        var isAdmin=elegibleroles.includes("admin")
        req.isAdmin=isAdmin
        next();
        }
        catch(err){
            res.status(400).send(err.message||"something went wrong")
        }
    })
    
}
module.exports={
    verifytokken:verifytokken

}