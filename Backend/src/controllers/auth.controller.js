
const userModel=require("../MODELS/user.models")
const jwt = require("jsonwebtoken")
async function googleRegister(req,res) {
    try {
        const{name,email,avatar}=req.body
        if(!email)
        {
            return res.status(400).json({
                message:"email is required"
            })
        }
        let user=await userModel.findOne({
            email
        })
        if(!user)
        {
           user=await userModel.create({
            name,email,avatar
           })
        }
      const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
res.cookie("token", token, {
 httpOnly: true,
 secure: true,
 sameSite: "none",
 maxAge: 7 * 24 * 60 * 60 * 1000,
 path: "/"
})
      return res.status(201).json({
        message:"user register succesfully",
        id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
        
      })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"internal server error"
        })
        
    }
    
}

async function googleLogout(req,res)
{
     try {
res.clearCookie("token",{
 httpOnly:true,
 secure:true,
 sameSite:"none",
 path:"/"
})
     return res.status(200).json({
        message:"user logout succesfull"

        })

     } catch (error) {
         console.log(error);
        return res.status(500).json({
            message:"internal server error"
        })
     }
}




module.exports={
    googleRegister,
    googleLogout
}
