const exp=require("express")
const app=exp()
const bodyparser=require("body-parser");
app.use(bodyparser.json())
require("dotenv").config()
const {Role}=require("./models")
//const{authvalidator}=require("./middleware")
const d=require("./models/index");
//const { INITIALLY_DEFERRED } = require("sequelize/types/deferrable");
d.sequelize.sync({force:false})
.then(()=>{
    console.log("DB synced");
    finduser();
}).catch((err)=>{
    console.log(err.message)
})
// async function  init()
// {
//     var roles=[
//         {name:"user"},
//         {name:"admin"}
        
//     ]
// }
async function finduser()
{
    
    try{
var u=await Role.findAll({
    where:{
        name:"user"
        }
        })
    //console.log(u)
if(!u.length)
{
 Role.create({
    id:1,
    name:"user"
});
console.log("user created")
}
 var a=await Role.findAll({
    where:{
        name:"admin"
        }
        })
        if(!a.length)
{
Role.create({
    id:2,
    name:"admin"
})
console.log("admin created")
}
    //console.log(u)
    // return u
}


catch(err){
    console.log(err.message)
}
}




require("./Routes/auth.route")(app)
require("./Routes/category.route")(app)
require("./Routes/products.route")(app)
require("./Routes/user.route")(app)
require("./Routes/cart.route")(app)

app.listen(process.env.PORT,()=>{
    console.log(`App is Running at${process.env.PORT}`)
})


