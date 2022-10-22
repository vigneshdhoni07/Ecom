
const {User,Sequelize,ROLES,Role}=require("../models/index");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
//const User=db.User



exports.authenticator=async(req,res)=>{
   var {username,
   email,
   password,
   roles}=req.body
    if(!roles || !roles.length)
    {
        roles=[ROLES[0]]
    }
    var user={
        username:username,
        email:email,
        password:bcrypt.hashSync(password,5)
    }
    try{
var u=await User.create(user)
var role= await Role.findAll({where:{name:{[Sequelize.Op.or]:roles}}})
//console.log(role)
            await u.setRoles(role)
            res.send({message:"user registered sucessfully"})
    }
   
catch(err){
    res.status(500).send(err.message||"some thing went wrong")
}
    
}
exports.signin=async(req,res)=>{
    var {username,password}=req.body;
    if(!username || !password)
    {
        req.status(400).send({message:"username or password can't be empty"})
    }
    try{
    var user= await User.findOne({where:{username:username}})
        if(!user)
        {
            res.status(401).send({message:`${username} doesn't exist`})
            return;
        }
    }
    catch(err)
    {
        res.status(500).send(err.message||"something wrong")
        return;
    }
        var Ispasswordvalid=bcrypt.compareSync(password,user.password);
        if(!Ispasswordvalid)
        {
            res.status(401).send({message:"Invalid password"})
            return;
        }
        var roles=[]
        var allRoles= await user.getRoles();
        //console.log(allRoles)
        allRoles.forEach(role => {
            roles.push(role.name)
        });
        var tokken=jwt.sign({id:user.id},process.env.SECRET_KEY,{})
        //console.log(tokken)
        //console.log(req.userdetails)
        res.send({
            id:user.id,
            username:user.username,
            email:user.email,
            roles:roles,
            accessToken:tokken
                })
    
}