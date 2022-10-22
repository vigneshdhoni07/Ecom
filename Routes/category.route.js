const cc=require("../controllers/category.controller")
const mw=require("../middleware")

module.exports=(app)=>{
    app.post("/ecom/category/v1",[mw.validator.categorynamevalidator,mw.authvalidator.verifytokken],cc.create);
    app.get("/ecom/category/v1",cc.getAll);
    app.get("/ecom/category/v1/:id",mw.validator.getbyidvalidator,cc.getID);
    app.put("/ecom/category/v1/:id",[mw.validator.categoryupdatevalidator,mw.authvalidator.verifytokken],cc.update);
    app.delete("/ecom/category/v1/:id",[mw.validator.getbyidvalidator,mw.authvalidator.verifytokken],cc.deleteBy);
    app.delete("/ecom/category/v1/",mw.authvalidator.verifytokken,cc.deleteAll);
    }
