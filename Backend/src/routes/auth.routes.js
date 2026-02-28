const express = require("express")
const authController=require("../controllers/auth.controller")

const authRoute=express.Router()

authRoute.post("/register",authController.googleRegister)
authRoute.get("logout",authController.googleLogout)




module.exports=authRoute