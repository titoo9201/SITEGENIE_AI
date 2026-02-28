const jwt = require("jsonwebtoken")
const userModel=require("../MODELS/user.models")

async function authMiddleware(req,res,next){
    try {
        const token =req.cookies.token
        if(!token)
        {
            return res.status(400).json({
                message:"token not found"
            })
        }
        const decode= jwt.verify(token,process.env.JWT_SECRET)
        req.user=await userModel.findById(decode.id)
        next()
    } catch (error) {
        return res.status(500).json({
            message:"invalid token"
        })
        
    }
}

module.exports={
    authMiddleware
}