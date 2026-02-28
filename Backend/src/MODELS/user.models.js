const mongoose = require("mongoose")
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

     
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    avatar:{
        type:String,

    },
    credits:{
        type:Number,
        default:200,
        min:0
    },
    plan:{
        type:String,
        enum:["free","pro","enterprise"],
        default:"free"
    },




   

},{timestamps:true}
)


const userModel=mongoose.model("users",userSchema)


module.exports=userModel
