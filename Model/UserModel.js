const mongoose=require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name:
        {
            type:String,
            require:true,
        },
        email:
        {
            type:String,
            require:true,
            unique:true

        },
        password:
        {
            type:String,
            require:true
        },
        cartData:
        {
            type:Object,
            default:{}
        }
    },{minimize:false}
)
const userModel= mongoose.model.user || mongoose.model("tbl_user",userSchema)
module.exports=userModel;