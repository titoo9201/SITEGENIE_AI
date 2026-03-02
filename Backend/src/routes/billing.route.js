const express = require("express")
const authMiddleware=require("../middleware/auth.middleware")
const billController=require("../controllers/billing.controller")

const bilingRouter=express.Router()

bilingRouter.post("/",authMiddleware.authMiddleware,billController.billing)


module.exports=bilingRouter