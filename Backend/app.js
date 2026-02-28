const express = require("express")
const authRoutes=require("./src/routes/auth.routes")
const cors =require("cors")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http:localhost:5173",
    credentials:true,
    
}))
app.use("/api/auth",authRoutes)
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"server checking "
    })
})



module.exports=app