const express = require("express")
const webController=require("../controllers/website.controller")
const authMiddleware = require("../middleware/auth.middleware")
const webRouter=express.Router()

webRouter.post("/gen",authMiddleware.authMiddleware,webController.generateWebsite)
webRouter.post("/update/:id",authMiddleware.authMiddleware,webController.codeChanges)
webRouter.get("/get/:id",authMiddleware.authMiddleware,webController.getWebsite)
webRouter.get("/get-all",authMiddleware.authMiddleware,webController.allWebsite)
webRouter.get("/deploy/:id",authMiddleware.authMiddleware,webController.deployWebsite)
webRouter.get("/get-by-slug/:slug",webController.findBySlug)


module.exports=webRouter