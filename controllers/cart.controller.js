const {User,Cart,Product,Category}=require("../models")
const productsModel = require("../models/products.model")

exports.create=async(req,res)=>
{
    if(!req.isAdmin)
    {
        res.status(400).send({message:"Unauthorised Access "})
    }
    const uid=req.userdetails.id
    //console.log(req.userdetails)
    try{
    const cart=await Cart.create({userId:uid})
        res.status(200).send("user cart created suceessfully")
    }
    catch(err)
    {
        res.status(400).send(err.message||"something went wrong")
        
    }
}
exports.update=async(req,res)=>
{
    
    // if(!req.isAdmin)
    // {
    //     res.status(400).send({message:"Unauthorised Access "})
    // }
    try{
        var newp=[]
        var exist=[]
        var updated=[]
     const userid=req.userdetails.id;
    var user=await User.findByPk(userid)
    var cart=await user.getCart();
    if(!cart)
    {
        res.status(400).send({message:"user cart doesn't exist"})
    }
    var usercart=await Cart.findByPk(cart.id)
    var newpro=await Product.findAll({where:{id:req.body.productid}})
    newpro.forEach((e)=>{
        //console.log(`new pro ${e.id}`)
        newp.push(e.id)
    })
    if(!newpro)
    {
        res.status(400).send({message:"No Products With Given Id's"})
    }
    var existingpro=await usercart.getProducts();
    existingpro.forEach((e)=>{
        //console.log(`existing pro ${e.id}`)
        exist.push(e.id)
    })

    var updatedpro=[...existingpro,...newpro]
    updatedpro.forEach((e)=>{
        //console.log(`updated pro ${e.id}`)
        updated.push(e.id)
    })
console.log(`new pro${newp}exist pro ${exist} updated pro${updated}`)
    await usercart.setProducts(updatedpro)
    var totalcost=findcost(updatedpro)
    await Cart.update({
        cost:totalcost
    },{where:{
        id:cart.id
    }})
    const USER_CART=await Cart.findByPk(cart.id)
    
    res.status(201).send(USER_CART)
}
catch(err)
    {
        //console.log(err.message)
        res.status(400).send(err.message||"something went wrong")
        
    }
}
exports.getcart=async(req,res)=>
{
    try{
var userid=req.userdetails.id
var cartpro=await findcart(userid)
res.status(200).json(cartpro)
    }
    catch(err)
    {
        //console.log(err.message)
        res.status(400).send(err.message||"something went wrong")
        
    }


}
exports.cartitemsdelete=async(req,res)=>
{
    try{
const productid=req.params.productid
const userid=req.userdetails.id
const user_cart=await findcart(userid)
const usercart=user_cart.cart;
const existingpro=user_cart.products;
const updatedpro=existingpro.filter((pro)=>{
    return pro.id!=productid
})
const totalcost=findcost(updatedpro)
const cartid=user_cart.cartid
await Cart.update({cost:totalcost},{where:{
    id:cartid
}})

usercart.setProducts(updatedpro)
res.status(200).json(updatedpro)
    }
    catch(err)
    {
        //console.log(err.message)
        res.status(400).send(err.message||"something went wrong")
        
    }
}
var findcost=(products)=>
{
var cost=0
for(let i=0;i<products.length;i++)
{
    cost+=products[i].cost
}
return cost
}
var findcart=async(userid)=>
{
    try
    {
    const user=await User.findByPk(userid)
    const cart=await user.getCart()
    const cartid=cart.id
    if(!cart)
    {
        res.status(400).json({message:"user not assosiated with cart"})
    }
    const usercart=await Cart.findByPk(cart.id)
    const existingpro=await usercart.getProducts()
    //const cost=findcost(existingpro)
    return{cart:usercart,products:existingpro,cartid:cartid}
}
catch(err)
    {
        //console.log(err.message)
        res.status(400).send(err.message||"something went wrong")
        
    }

}