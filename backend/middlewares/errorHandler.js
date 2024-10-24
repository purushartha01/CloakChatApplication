const { nodeEnv } = require("../config/config");

const notFound=(req,res,next)=>{
    const error=new Error(`Endpoint not found- ${req.originalUrl}`);
    res.status(404);
    next(error);
}


const errorHandler=(err,req,res,next)=>{
    // console.log(res)
    const statusCode= res.statusCode===200?500:res.statusCode;
    res.status(statusCode);
    res.json({
        status: "Failed",
        message: err.message,
        stack: nodeEnv==='production'?null:err.stack,
    });
};



module.exports={notFound,errorHandler}