const express = require("express")
const dotenv=require("dotenv");
const Connect  = require("./Connection/Connect");
const Cloudinary = require("./Connection/Cloudinary");
const UserRouter = require("./Router/UserRouter");
const ProductRouter = require("./Router/ProductRouter");
const cors=require("cors");
const CartRouter = require("./Router/CartRouter");
const OrderRouter = require("./Router/OrderRouter");


const app= express();

dotenv.config();
Connect();
app.use(cors());
app.use(express.json());

app.use("/user",UserRouter);
app.use("/product",ProductRouter);
app.use("/cart",CartRouter);
app.use("/order",OrderRouter);

const PORT = process.env.PORT || 4000
app.get("/",(req,res)=>
{
    return res.status(200).send({message:"sucess"})
})

app.listen(PORT,()=>
{
    console.log(`server start on port ${PORT}`);
})