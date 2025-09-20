const express=require("express");
const { allOrders, updateStatus, placeOrder, placeOrderStripe, placeOrderRazorpay, userOrders, verifyStripe } = require("../Controller/OrderController");
const AdminAuth = require("../Middleware/AdminAuth");
const Auth = require("../Middleware/Auth");

const OrderRouter=express.Router()
{
    OrderRouter.post("/list",AdminAuth,allOrders);
    OrderRouter.post("/status",AdminAuth,updateStatus);

    OrderRouter.post("/place",Auth,placeOrder);
    OrderRouter.post("/stripe",Auth,placeOrderStripe);
    OrderRouter.post("/razorpay",Auth,placeOrderRazorpay);

    OrderRouter.post("/userorders",Auth,userOrders);
    OrderRouter.post("/verifyStripe",Auth,verifyStripe);
}
module.exports=OrderRouter;