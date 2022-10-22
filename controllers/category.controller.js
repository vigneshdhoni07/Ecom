const db=require("../models/index")
const Category=db.Category;

exports.create=function(req,res)
{   
    var admin=req.isAdmin;
    if(!admin)
    {
        res.status(400).json({message:"Unauthorized Access"})
        return
    }
    const{name,description}=req.body;

     
    const category={
        name:name,
        description:description
    }
    Category.create(category)
    .then((category)=>{
        //console.log(`category with name ${category.name} is created sucessfully`)
        res.status(201).send({message:"Creation Sucess"})
    }).catch((err)=>{
        res.status(500).send({message:"something went wrong"})
    })
}
exports.getAll=(req,res)=>
{
    
    Category.findAll().then((c)=>{
        res.send(c);
    })
    .catch((err)=>{
        res.status(500).send("some thing went wrong")
    })
}
exports.getID=(req,res)=>{
    const categoryid=req.params.id;
    Category.findByPk(categoryid).then((categ)=>{
       
        res.send(categ)
    }).catch((er)=>{
        res.status(500).send("something went wrong")
    })
}
exports.update=(req,res)=>{
    var admin=req.isAdmin;
    if(!admin)
    {
        res.status(400).json({message:"Unauthorized Access"})
        return
    }
    const categid=req.params.id;
    const{name,description}=req.body;
    const category={}
    if(req.body.id)
    {
        category.id=req.body.id
    }
    if(name)
    {
        category.name=name;
    }
    if(description)
    {
        category.description=description;
    }
    Category.update(category,{
        where:{id:categid}
    }).then((upca)=>{
        res.send({message:`${upca[0]} records updated successfully`});
    }).catch((err)=>{
        res.status(500).send({message:`some thing went wrong`})
    })
}
exports.deleteBy=(req,res)=>{
    var admin=req.isAdmin;
    if(!admin)
    {
        res.status(400).json({message:"Unauthorized Access"})
        return
    }
    const categid=req.params.id;
    Category.destroy({
        where:{
            id:categid
        }
    }).then((sd)=>{
        // if(!sd)
        // {
        //     res.status(400).send({message:`category with ${categid} is not present`})
        // }
        res.send({message:"Deleted Successfully"})
    }).catch((err)=>{
        res.status(500).send({message:"Something Went Wrong"})
    })
}
exports.deleteAll=(req,res)=>{
    var admin=req.isAdmin;
    if(!admin)
    {
        res.status(400).json({message:"Unauthorized Access"})
        return
    }
    Category.truncate().then((da)=>{
        res.send({message:"Deleted All Successfully"})
    }).catch((er)=>{
        res.status(500).send("Something Went Wrong")
    })
}