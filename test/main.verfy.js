const calculator=require("../Calculator")
const calc=require("../calc")

const mock=require("./interceptors")


//describe("Testing Prac",()=>{
//     var bf,af,pro;
//     beforeEach(()=>{
//         bf=10
//     })
//     beforeAll(()=>{
//         ba=20
//          pro=function()
//         {
//             return new Promise((resolve,reject)=>{
//                 setTimeout(()=>{
//                     //resolve(10)
//                     reject(new Error("Error"))
//                 },2000)
//             })
//         }
//     })
//     afterEach(()=>{
//         console.log("after each")
//     })
//     afterAll(()=>{
//         console.log("after All")
//     })
    
//     test("Testing SpyOn",()=>{
// const addMock=jest.spyOn(calculator,"add")
// addMock.mockImplementation((c,b)=>10)
// const subMock=jest.spyOn(calculator,"sub")
// subMock.mockImplementation((a,b)=>10)
// const multiMock=jest.spyOn(calculator,"mul")
// multiMock.mockImplementation((a,b)=>10)
// const diviMock=jest.spyOn(calculator,"div")
// diviMock.mockImplementation((a,b)=>10)

// expect(calc(10,5)).toBe(20)
// expect(bf).toBeGreaterThan(5)
// expect(ba).toBeGreaterThanOrEqual(20)
        
//     })
//     it("null test",()=>{
//         var result=null;
//         expect(result).toBeNull()
//         expect(ba).not.toBeNull()
//     })
//     it("undefined",()=>{
//         var u;
//         expect(u).toBeUndefined()
//         expect(bf).not.toBeUndefined()
//     })
//     it("truthy falsy",()=>{
//         var t=10
//         var tr=true
//         var f=false
//         var u=undefined
//         var n=null
//         expect(t).toBeTruthy()
//         expect(n).toBeFalsy()
//         expect(u).toBeFalsy()
//         expect(tr).toBeTruthy()
//         expect(f).toBeFalsy()
//         expect(ba).toBeTruthy()
        
    // })
    // it("testing promise",async()=>{
    
    //         expect(pro()).rejects.toMatch("Error")
    
        
    // })

//})
// var req;
// beforeEach(()=>{
//     //mock.mockreq().body={name:"vignesh",age:27}
//     req=mock.mockreq()
// })
// describe("testing mock",()=>{
//     beforeEach(()=>{
//         req.body={name:"vignesh",age:27}
//         //req=mock.mockreq()
//     })
//     test("mock obj",()=>{
     
//     })
//})