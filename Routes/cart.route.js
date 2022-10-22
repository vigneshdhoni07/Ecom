const cartcontroller=require("../controllers/cart.controller")
const mw=require("../middleware")
module.exports=(app)=>
{
app.post("/ecom/cart/v1/create",mw.authvalidator.verifytokken,cartcontroller.create)
app.put("/ecom/cart/v1/update",mw.authvalidator.verifytokken,cartcontroller.update)
app.get("/ecom/cart/v1/getcart",mw.authvalidator.verifytokken,cartcontroller.getcart)
app.delete("/ecom/cart/v1/getcart/:productid",mw.authvalidator.verifytokken,cartcontroller.cartitemsdelete)
}