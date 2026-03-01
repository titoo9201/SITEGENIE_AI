const express = require("express")
const webController=require("../controllers/website.controller")
const authMiddleware = require("../middleware/auth.middleware")
const webRouter=express.Router()

webRouter.post("/gen",authMiddleware.authMiddleware,webController.generateWebsite)

module.exports=webRouter