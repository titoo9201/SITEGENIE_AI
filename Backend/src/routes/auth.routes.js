const express = require("express")
const authController=require("../controllers/auth.controller")

const authRoute=express.Router()
// /api/auth/register
authRoute.post("/register",authController.googleRegister)
// /api/auth/logout
authRoute.get("/logout",authController.googleLogout)




module.exports=authRoute