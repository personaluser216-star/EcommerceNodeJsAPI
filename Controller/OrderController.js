const orderModel = require("../Model/OrderModel");
const userModel = require("../Model/UserModel");
const productModel = require("../Model/ProductModel");
const Stripe = require("stripe")

const currency = 'inr'
const deliveryCharge = 20

const stripe =new Stripe(process.env.STRIPE_SECRETKEY)


const placeOrder = async(req,res)=>
{
    try {
        const {userId , items ,amount , address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()

        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
const placeOrderStripe = async(req,res)=>
{
    try {
        const {userId,items,amount,address} = req.body
        const {origin} = req.headers
         const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()

        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>
        (
          {
            price_data:{
              currency, 
              product_data:{
                name:item.name
              },
              unit_amount:item.price * 100
            },
            quantity:item.quantity
          }
        )
        )

        line_items.push({
          price_data:{
              currency:currency,
              product_data:{
                name:'Delivery Charges'
              },
              unit_amount:deliveryCharge * 100
            },
            quantity:1
        })

      const session = await stripe.checkout.sessions.create({
  success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
  cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
  line_items,
  mode: "payment",
});

        res.json({success:true,session_url:session.url})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
const verifyStripe=async(req,res)=>
{
  try {
    const {orderId,success,userId} = req.body;
    try {
      if(success === 'true')
      {
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true});
      }
      else{
        await orderModel.findByIdAndDelete(orderId)
        res.json({success:false})
      }
    } catch (error) {
      res.json({success:true,message:error.message})
    }
  } catch (error) {
    
  }
}
const placeOrderRazorpay = async(req,res)=>
{
    try {
        
    } catch (error) {
        
    }
}
const allOrders = async(req,res)=>
{
    try {
        const orders = await orderModel.find({}).sort({ date: -1 }); 
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    console.log(orders)
    for (let order of orders) {
      for (let i = 0; i < order.items.length; i++) {
        const product = await productModel.findById(order.items[i].productId);
        if (product) {
          order.items[i].image1 = product.image1; 
        }
      }
    }

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async(req,res)=>
{
    try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      status
    });
   

    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
}
module.exports={verifyStripe,placeOrder,placeOrderRazorpay,placeOrderStripe,userOrders,updateStatus,allOrders}