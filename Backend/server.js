require("dotenv").config()
const app =require("./app");
const connectDB = require("./src/DATABASE/db");

connectDB();
app.listen(3000,()=>{
    console.log("server is the runnig on the 3000");
    
})