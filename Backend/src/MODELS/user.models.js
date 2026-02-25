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
    credit:{
        type:Number,
        default:50,
        min:0
    },
    iscreditAvailable:{
        type:Boolean,
         default:true,
    },



   

},{timestamps:true}
)


const userModel=mongoose.model("user",userSchema)
