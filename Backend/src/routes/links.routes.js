const express=require('express');


const linkRouter=express.Router()


linkRouter.get("/links");


linkRouter.post("/links")


linkRouter.delete("/links")





module.exports=linkRouter;