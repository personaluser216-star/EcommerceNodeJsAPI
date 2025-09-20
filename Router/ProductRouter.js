const express=require("express")
const { addProduct, listProduct, removeProduct, singleProduct } = require("../Controller/ProductController");
const upload = require("../Middleware/Multer");
const AdminAuth = require("../Middleware/AdminAuth");

const ProductRouter=express.Router()
{
    ProductRouter.post("/add",AdminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},
        {name:"image4",maxCount:1}
    ]),addProduct);
    ProductRouter.get("/get",listProduct);
    ProductRouter.post("/delete",removeProduct);
    ProductRouter.get("/get/:id",singleProduct);
}
module.exports=ProductRouter;