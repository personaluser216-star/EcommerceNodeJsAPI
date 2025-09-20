const JWT=require("jsonwebtoken")

const AdminAuth = async (req,res,next)=>
{
    try {
        const { token } = req.headers
        if(!token)
        {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode = JWT.verify(token,process.env.JWT_SECRETKEY)
        if(token_decode != process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD)
        {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        next()
    } catch (error) {
        res.json({success:false,message:error.message})
    }

    
}
module.exports=AdminAuth;