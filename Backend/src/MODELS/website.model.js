const mongoose=require("mongoose")

const MessageSchema = new mongoose.Schema({
   role:{
    type:String,
    enum:["ai","user"],
    required:true
    
   },
   content:{
    type:String,
    required:true,

   }
},{timestamps:true})


const websiteSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  title:{
    type:String,
    default:"Untitled Website"

  },
  code:{
    type:String,
    required:true,

  },
  conversation:[
    MessageSchema
  ],
  deployed:{
    type:Boolean,
    default:false

  },
  deployurl:{
    type:String,

  },
  slug:{
    type:String,
    unique:true
  }


},{timestamps:true})


const websiteModel= new mongoose.model("websites",websiteSchema)

module.exports=websiteModel
