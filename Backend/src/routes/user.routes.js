const express=require("express")
const authmiddleware=require("../middleware/auth.middleware")
const userController  = require("../controllers/user.controller")

const userRoute=express.Router()
//api/user/me
userRoute.get("/me",authmiddleware.authMiddleware,userController.getCurrentUser)


module.exports=userRoute