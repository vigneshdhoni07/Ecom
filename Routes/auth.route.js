const mw=require("../middleware")
const ac=require("../controllers/auth.controller")
module.exports=(app)=>{
    app.post("/ecom/user/v1/signup",[mw.signupvalidator.checkUserandEmail,mw.signupvalidator.checkrolesexist],ac.authenticator)
    app.post("/ecom/user/v1/signin",ac.signin)
}
