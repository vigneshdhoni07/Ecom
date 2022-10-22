const pc=require("../controllers/products.controller")
const mw=require("../middleware")

module.exports=(app)=>{
    app.post("/ecom/product/v1",[mw.validator.productvalidator,mw.authvalidator.verifytokken],pc.create)
    app.get("/ecom/product/v1",pc.getAll)
    app.get("/ecom/product/v1/:id",pc.getBy)
    app.put("/ecom/product/v1/:id",[mw.validator.productvalidator,mw.authvalidator.verifytokken],pc.update)
    app.get("/ecom/product/v1/:categoryid/products/",mw.validator.productscategoryvalidator,pc.getallproductsincategory)
    app.get("/ecom/product/v1/:categoryid/products/:productid",mw.validator.proincategory,pc.getaproductincategory)
    app.delete("/ecom/product/v1",mw.authvalidator.verifytokken,pc.deleteAll)
}