const mongoose=require("mongoose")
const dotenv= require("dotenv")

dotenv.config();

const Connect= async()=>
{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected..")
    } catch (error) {
        console.log("database disconnected....")
    }
}
module.exports=Connect;