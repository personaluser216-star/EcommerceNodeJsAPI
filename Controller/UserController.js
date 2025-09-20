const userModel = require("../Model/UserModel");
const validator=require("validator")
const bcrypt=require("bcrypt")
const JWT=require("jsonwebtoken")
const dotenv=require("dotenv");
const { create } = require("../Model/ProductModel");

dotenv.config()

const createToken=(id)=>
{
    return JWT.sign({id}, process.env.JWT_SECRETKEY)
}
const LoginUser=async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user)
        {
                        return res.json({success:false,message:"user does not exists"})

        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch)
        {
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else
        {
            res.json({success:false,message:"Invalid Credentails"})
        }
    } catch (error) {
        res.json({success:false,message:"error.message"})
    }
}
const registerUser = async(req,res)=>
{
    try {
        const {name , email,password} = req.body;
        const exists = await userModel.findOne({email})
        if(exists)
        {
            return res.json({success:false,message:"user already exists"})
        }
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"please enter valid email"})

        }
        if(password.length < 8)
        {
            return res.json({success:false,message:"please enter a strong password"})

        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({name,email,password:hashedPassword})

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
const adminLogin = async(req,res)=>
{
    try {
        const {email,password}= req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {
            const token = JWT.sign(email+password,process.env.JWT_SECRETKEY)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
                res.json({success:false,message:error.message})

    }
}
module.exports={LoginUser,registerUser,adminLogin}