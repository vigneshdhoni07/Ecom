//const jest=require("jest")
const mock={
    mockreq:()=>{
        const req={}
        req.body=jest.fn().mockReturnValue(req)
        req.parse=jest.fn().mockReturnValue(req)
        req.query=jest.fn().mockReturnValue(req)
        req.params=jest.fn().mockReturnValue(req)
        return req
    },
    mockres:()=>{
        const res={}
        res.status=jest.fn().mockReturnValue(res)
        res.send=jest.fn().mockReturnValue(res)
        res.json=jest.fn().mockReturnValue(res)
        return res

    }
}

module.exports=mock;