const express = require("express")
const authRoutes=require("./src/routes/auth.routes")
const userRoutes=require("./src/routes/user.routes")
const webRoutes = require("./src/routes/web.routes")
const billRoutes=require("./src/routes/billing.route")
const { stripeWebhook } = require("./src/controllers/webhook.controller");
const cors =require("cors")
const cookieParser = require("cookie-parser")
const app = express()
app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://sitegenie-ai-1.onrender.com",
    credentials:true,
    
}))
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/web",webRoutes)
app.use("/api/bill",billRoutes)
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"server checking "
    })
})



module.exports=app
