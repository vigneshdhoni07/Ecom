const mw=require("../middleware")
const uc=require("../controllers/user.controller")
module.exports=(app)=>{
    app.get("/ecom/user/v1/users",mw.authvalidator.verifytokken,uc.getusers)
}