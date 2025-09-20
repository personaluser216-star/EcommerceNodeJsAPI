const express=require("express");
const { addToCart, getUserCart, updateCart } = require("../Controller/CartController");
const Auth = require("../Middleware/Auth");

const CartRouter=express.Router();

{
    CartRouter.post("/add",Auth,addToCart);
    CartRouter.get("/get",Auth,getUserCart);
    CartRouter.post("/update",Auth,updateCart);
}
module.exports=CartRouter;