const db=require("../../models")
const Product=db.Product;
const ProductController=require("../../controllers/products.controller")
const mock=require("../interceptors")
const newProduct=require("../testdsata/newproduct.json")
var req,res;
var err1={message:"Unauthorized Access"};
var pid;
beforeAll(()=>{
req=mock.mockreq()
res=mock.mockres()
})

describe("testing product controller",()=>{
    beforeEach(()=>{
        req.body=newProduct
        req.params.id=1
       // req.isAdmin=false
    })
    afterEach(()=>{
        jest.clearAllMocks()
    })
    test("testing product create with admin",async ()=>{/////when we give admin false test case before it spy wont get initialized 
                                                        //and after this we call admin true and works fine without clearmocks(),but if we 
                                                        //give admin true before it willinitialize spy and it will be called in admin false also
        req.isAdmin=true;                               //sowe have to use clear mock in aftereach
        const spy=jest.spyOn(Product,"create")
        spy.mockImplementation((newProduct)=>{
            return Promise.resolve(newProduct)
        })
       await ProductController.create(req,res)

        await expect(spy).toHaveBeenCalled()
        await expect(res.status).toHaveBeenCalledWith(201)
        await expect(res.send).toHaveBeenCalledWith(newProduct)

    })
    test("testing product create with normal user",async ()=>{
        req.isAdmin=false;
        const spy=jest.spyOn(Product,"create")
        spy.mockImplementation((newProduct)=>{
            return Promise.resolve(newProduct)
        })
        await ProductController.create(req,res)

        await expect(spy).not.toHaveBeenCalled()
        await expect(res.status).toHaveBeenCalledWith(400)
        await expect(res.json).toHaveBeenCalledWith(err1)

    })
    test("testing product create with server error",async ()=>{
        req.isAdmin=true;
        const spy=jest.spyOn(Product,"create")
        spy.mockImplementation((newProduct)=>{
            return Promise.reject(new Error("Error"))
        })
        await ProductController.create(req,res)

        await expect(spy).toHaveBeenCalled()
        await expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith("Error")

    })
    test("testing get a by id product happy case ",async ()=>{
    
        pid=req.params.id
       const spy=jest.spyOn(Product,"findByPk")
       spy.mockImplementation((pid)=>{
           return Promise.resolve(newProduct)
       })
      await ProductController.getBy(req,res)

       
       await expect(spy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith(newProduct)

   })
   test("testing get a by id product with wrongid ",async ()=>{
    req.params.id=2
    pid=req.params.id
   const spy=jest.spyOn(Product,"findByPk")
   spy.mockImplementation((pid)=>{
       return Promise.resolve(null)
   })
  await ProductController.getBy(req,res)

   
   await expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({message:`product with ${pid} not present`})

})
    test("testing get a by id product with server error ",async ()=>{
         pid=req.params.id;
        const spy=jest.spyOn(Product,"findByPk")
        spy.mockImplementation((pid)=>{
            return Promise.reject(new Error("Error"))
        })
       await ProductController.getBy(req,res)

        
        await expect(spy).toHaveBeenCalled()
         expect(res.status).toHaveBeenCalledWith(500)
        await expect(res.send).toHaveBeenCalledWith("Error")

    })

})