const { Product } = require("../models");
const db=require("../models")
const Category=db.Category;
const categorynamevalidator=async(req,res,next)=>{
    const name=req.body.name
    if(!name)
    {
        res.status(400).send({message:"category name is empty"})
        return;
    }   
    try{
        var NAME=await Category.findOne({
            where:{
                name:name
            }
        })
        if(NAME)
        {
            res.status(400).send({message:`Category ${name} Already Exist`})
            return
        }
    next()
    }
    catch(err){
        
        res.status(500).send(err.message||"something wrong")
                }
}
const productvalidator=(req,res,next)=>{
    if(!req.body.name||!req.body.cost){
        res.status(400).send("name or cost cannot be empty")
        return;
    }
    if(!req.body.categoryId)
    {
        res.status(400).send("CategoryId cannot be empty")
        return;
    }
    Category.findByPk(req.body.categoryId).then((s)=>{
        if(!s){
            res.status(400).send(`Category id ${req.body.categoryId} doesn't exist`)
            return;
        }
        next()
    }).catch((e)=>{
        res.status(500).send("something went wrong")
    })
    
}
const getbyidvalidator=(req,res,next)=>{

    const cid=req.params.id;
    if(!cid)
    {
        res.status(400).json({message:"category id cannot be empty"})
        return;
    }
    Category.findByPk(cid).then((s)=>{
        if(!s){
            res.send({message:`category with ${cid} doesn't exist`})
            return;
        }
    }).catch((e)=>{
        res.status(500).send("something went wrong")
    })
    next()
}
const categoryupdatevalidator=(req,res,next)=>{
    const name=req.body.name
    const description=req.body.description
    const cid=req.params.id;
    if(!cid)
    {
        res.status(400).json({message:"category id cannot be empty"})
        return;
    }
    Category.findByPk(cid).then((s)=>{
        if(!s){
            res.send({message:`category with ${cid} doesn't exist`})
            return;
        }
    }).catch((e)=>{
        res.status(500).send("something went wrong")
    })
    if(!name)
    {
        res.status(400).send({message:"category name is empty"})
        return;
    }   
    // if(!description)
    // {
    //     res.status(400).send({message:"category description is empty"})
    //     return;
    // }
    next();
}
const productscategoryvalidator=(req,res,next)=>
{
    const categoryid=req.params.categoryid;
    if(!categoryid)
    {
        res.status(400).send("category not found")
        return
    }
    Category.findByPk(categoryid).then((c)=>{
                    if(!c)
                    {
                                res.status(400).send({message:`category with id ${categoryid} not present`})
                                return;
                    }
                    next();
                    }).catch((err)=>{
        res.status(500).send(err.message||"something wrong")
                })

}
const proincategory=(req,res,next)=>
{
    var categoryid=req.params.categoryid;
    var productid=req.params.productid;
    if(!categoryid || !productid)
    {
        req.status(400).send("categorid or productid not given")
    }
    Category.findByPk(categoryid).then((category)=>{
                if(!category)
                {
                    res.status(400).send({message:`category with id ${categoryid} not present`})
                    return
                }
            })
                Product.findByPk(productid).then((p)=>
                {
                    if(!p)
                    {
                        res.status(400).send({message:`product with id ${productid} not present`})
            return
        }next()
        })
    
    }
                 

module.exports={
    categorynamevalidator:categorynamevalidator,
    productvalidator:productvalidator,
    categoryupdatevalidator:categoryupdatevalidator,
    productscategoryvalidator:productscategoryvalidator,
    proincategory:proincategory,
    getbyidvalidator:getbyidvalidator
}