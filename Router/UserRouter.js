const express=require("express")
const { registerUser, LoginUser, adminLogin } = require("../Controller/UserController");


const UserRouter=express.Router()
{
    UserRouter.post("/register",registerUser);
    UserRouter.post("/login",LoginUser);
    UserRouter.post("/admin",adminLogin);
}
module.exports=UserRouter;