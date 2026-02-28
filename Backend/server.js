require("dotenv").config()
const app =require("./app");
const connectDB = require("./src/DATABASE/db");

connectDB();
app.listen(process.env.PORT,()=>{
    console.log("server is the runnig on the 3000");
    
})