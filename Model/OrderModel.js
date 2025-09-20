const { default: mongoose } = require("mongoose");


const orderSchema = new mongoose.Schema({
    userId:
    {
        type:String,
        require:true
    },
    items:
    {
        type:Array,
        require:true,
    },
    amount:
    {
        type:String,
        require:true
    },
    address:
    {
        type:Object,
        require:true
    },
    status:
    {
        type:String,
        require:true,
        default:"Order Placed"
    },
    paymentMethod:
    {
        type:String,
        require:true,
    },
    payment:
    {
        type:Boolean,
        require:true,
        default:false
    },
    date:
    {
        type:Number,
        require:true,
    }
}
)
const orderModel = mongoose.model.order || mongoose.model('tbl_order',orderSchema)
module.exports=orderModel;