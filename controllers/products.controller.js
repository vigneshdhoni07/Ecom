const { Category } = require("../models");
const db=require("../models")
const Product=db.Product
const Categoty=db.Category

exports.create=async(req,res)=>{
    var admin=req.isAdmin;
    if(!admin)
    {
        res.status(400).json({message:"Unauthorized Access"})
        return
    }
    const {name,description,cost,categoryId}=req.body;
  
    const product={
        name:name,
        description:description,
        cost:cost,
        categoryId:categoryId
    }
    try{
    var s=await Product.create(product)
        res.status(201).send(s)
    }
    catch(err){
       // console.log(err)
       // console.log(err.message)
        res.status(500).send(err.message ||"something went wrong")
    }
}
exports.getAll=(req,res)=>
{   console.log(req.query)
    
    var productspromise=null
    if(req.query.name)
    {
        productspromise=Product.findAll({
            where:{
                name:req.query.name
            }
        })
    }
    else if(req.query.mincost && Object.keys(req.query).length<=1){
        productspromise=Product.findAll({
            where:{
                cost:{
                    [db.Sequelize.Op.gte]:req.query.mincost
                }
            }
        })

    }
    else if(req.query.maxcost && Object.keys(req.query).length<=1){
        productspromise=Product.findAll({
            where:{
                cost:{
                    [db.Sequelize.Op.lte]:req.query.maxcost
                }
            }
        })

    }
    else if(Object.keys(req.query).length!=0){
        productspromise=Product.findAll({
            where:{
                cost:
                {
                    [db.Sequelize.Op.between]:
                    [
                        
                    parseInt(req.query.mincost),
                        
                    parseInt(req.query.maxcost)
                        
                    ]
                }
            }
        })

    }
    else{
        productspromise=Product.findAll()
    }
    productspromise.then((s)=>{
        res.send(s)
    }).catch((err)=>{
        res.status(500).send(err.message||"something went wrong")
    })
}
exports.getBy=async (req,res)=>{
    const pid=req.params.id;
    try{
   var vid=await Product.findByPk(pid)
        if(!vid)
        {
            res.status(400).send({message:`product with ${pid} not present`})
        }
        res.status(201).send(vid)
    }
   catch(err)
   {
        console.log("rejected promise")
        res.status(500).send(err.message||"something went wrong")
   }
}
exports.update=(req,res)=>{
    var admin=req.isAdmin;
    if(!admin)
    {
        res.status(400).json({message:"Unauthorized Access"})
        return
    }
    const proid=req.params.id;
    const{name,description,cost,categoryId}=req.body;
    const products={};
    if(name)
    {
        products.name=name;
    }
    if(description)
    {
        products.description=description;
    }
    if(cost)
    {
        products.cost=cost
    }
    if(categoryId)
    {
        products.categoryId=categoryId
    }
    Product.update(products,{
        where:{id:proid}
    }).then((s)=>{
        res.send(`${s} updated sucessfully`)
    }).catch((err)=>{
        res.status(500).send(err.message||"something went wrong")
    })
}
exports.deleteAll=(req,res)=>{
    var admin=req.isAdmin;
    if(!admin)
    {
        res.status(400).json({message:"Unauthorized Access"})
        return
    }
    Product.truncate().then(()=>{
        res.send({message:"All Products Deleted Sucessfully"})
    }).catch(()=>{
        res.status(500).send("something went wrong")
    })
}
exports.getallproductsincategory=(req,res)=>{
    const categoryid=req.params.categoryid;
  
        Product.findAll({
            where:{categoryId:categoryid}
        }).then((pro)=>{
            //console.log(pro)
            res.send(pro)
        }).catch((e)=>{
            res.status(500).send("something went wrong")
        })
    }

exports.getaproductincategory=(req,res)=>{
    const categoryid=req.params.categoryid;
    const productid=req.params.productid;
    
        Product.findAll({
            where:{categoryId:categoryid,
            id:productid}
        }).then((pro)=>{
            if(!pro.length)
            {
                res.status(400).send({message:`product with id ${productid} not present in category with id${categoryid}`})
            }
            res.send(pro)
        }).catch((e)=>{
            res.status(500).send("something went wrong")
        })
    }
